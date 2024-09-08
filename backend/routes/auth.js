const express = require('express');
const router = express.Router();

const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const db = require('../utils/database-init');
const { dbGet, dbRun } = require('../utils/db-async');
const { hashPassword, authenticateToken } = require('../utils/auth-helpers');

const JWT_SECRET = process.env.JWT_SECRET;

// Passport Local Strategy
passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async function verify(email, password, cb) {
    try {
        const user = await dbGet(db, "SELECT * FROM users_auth WHERE email = ?", [email]);

        // If user not found
        if (!user) {
            return cb(null, false, { message: 'Incorrect username or password.' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password, user.salt);

        // Compare the hashed password with the stored hashed password
        if (!crypto.timingSafeEqual(hashedPassword, user.hashed_password)) {
            return cb(null, false, {
                type: "error",
                message: "Incorrect username or password.",
            });
        }

        // Authentication successful
        return cb(null, user);

    } catch (err) {
        return cb(err);
    }
}));

// User registration
router.post('/register', async (req, res) => {
    try {
        const { email, password, name, phone_number } = req.body;
        const salt = crypto.randomBytes(16);
        const hashedPassword = await hashPassword(password, salt);
        await dbRun(db, "INSERT INTO users_auth ( hashed_password, salt, email) VALUES (?, ?, ?)", [hashedPassword, salt, email]);
        await dbRun(db,
            "INSERT INTO users_info (user_id, name, email, phone_no) VALUES ((SELECT id FROM users_auth WHERE email = ?), ?, ?, ?)",
            [
                email,
                name,
                email,
                phone_number
            ]
        );
        return res.status(200).send("User registration successful") // User registration successful
    } catch (err) {
        return res.status(500).send("User registration failed");
    }
});

// User login
router.post('/login', (req, res, next) => {
    passport.authenticate("local", async (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).send("Incorrect username or password.")
        }

        // Get user data
        const { email, id } = user;
        // Create a JWT token
        const token = jwt.sign({ id, email }, JWT_SECRET);

        return res.status(200).json({ message: "Login successful", token });
    })(req, res, next);
});

// Protected route
router.get('/user', authenticateToken, async (req, res) => {
    try {
        const user = await dbGet(db, "SELECT * FROM users_info WHERE email = ?", [req.user.email]);
        if (!user) {
            return res.status(500).send("User not found");
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).send("Failed to fetch user data");
    }
});

module.exports = router;
