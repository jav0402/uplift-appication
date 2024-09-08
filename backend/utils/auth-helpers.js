const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Function to hash a password
function hashPassword(password, salt) {
    try {
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256');
        return Promise.resolve(hashedPassword);
    } catch (err) {
        return Promise.reject(err);
    }
}

// ensure JWT token is authenticated
function authenticateToken(req, res, next) {
    const headerAuth = req.headers.authorization;
    if (!headerAuth) {
        res.sendStatus(401); // Unauthorized
    };
    const token = headerAuth.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

module.exports = { hashPassword, authenticateToken };
