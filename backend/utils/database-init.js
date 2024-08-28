var crypto = require("crypto");
const sqlite3 = require("sqlite3").verbose();
const { dbRun } = require("./db-async");

var db = new sqlite3.Database("./backend/database.db", function(err) {
    if (err) {
        console.error(err);
        process.exit(1); // bail out we can't connect to the DB
    } else {
        console.log("Database connected");
        db.run("PRAGMA foreign_keys=ON"); // tell SQLite to pay attention to foreign key constraints
        // create initial user author (username: admin, password: passwd)
        var salt = crypto.randomBytes(16);

        db.get("SELECT * FROM users_auth", async function(err, row) {
            if (row) {
                return;
            }
            // Create mock users
            await dbRun(db,
                "INSERT OR IGNORE INTO users_auth (hashed_password, salt, email) VALUES ( ?, ?, ?)",
                [
                    crypto.pbkdf2Sync("passwd", salt, 310000, 32, "sha256"),
                    salt,
                    "xavier@gmail.com"
                ],
            );
            await dbRun(db,
                "INSERT OR IGNORE INTO users_info (user_id, name, email, phone_no) VALUES ((SELECT id FROM users_auth WHERE email = ?), ?, ?, ?)",
                [
                    "xavier@gmail.com",
                    "Xavier",
                    "xavier@gmail.com",
                    "81231234"
                ],
            );
            await dbRun(db,
                "INSERT OR IGNORE INTO users_auth (hashed_password, salt, email) VALUES ( ?, ?, ?)",
                [
                    crypto.pbkdf2Sync("pass", salt, 310000, 32, "sha256"),
                    salt,
                    "shad@gmail.com"
                ],
            );
            await dbRun(db,
                "INSERT OR IGNORE INTO users_info (user_id, name, email, phone_no) VALUES ((SELECT id FROM users_auth WHERE email = ?), ?, ?, ?)",
                [
                    "shad@gmail.com",
                    "Shad",
                    "shad@gmail.com",
                    "81231234"
                ],
            );
            await dbRun(db,
                "INSERT OR IGNORE INTO users_auth (hashed_password, salt, email) VALUES ( ?, ?, ?)",
                [
                    crypto.pbkdf2Sync("pass", salt, 310000, 32, "sha256"),
                    salt,
                    "jh@gmail.com"
                ],
            );
            await dbRun(db,
                "INSERT OR IGNORE INTO users_info (user_id, name, email, phone_no) VALUES ((SELECT id FROM users_auth WHERE email = ?), ?, ?, ?)",
                [
                    "jh@gmail.com",
                    "Jun Heng",
                    "jh@gmail.com",
                    "81231234"
                ],
            );
            await dbRun(db,
                "INSERT OR IGNORE INTO users_auth (hashed_password, salt, email) VALUES ( ?, ?, ?)",
                [
                    crypto.pbkdf2Sync("pass", salt, 310000, 32, "sha256"),
                    salt,
                    "javier@gmail.com"
                ],
            );
            await dbRun(db,
                "INSERT OR IGNORE INTO users_info (user_id, name, email, phone_no) VALUES ((SELECT id FROM users_auth WHERE email = ?), ?, ?, ?)",
                [
                    "javier@gmail.com",
                    "Javier",
                    "javier@gmail.com",
                    "81231234"
                ],
            );

            await dbRun(db,
                "INSERT OR IGNORE INTO users_auth (hashed_password, salt, email) VALUES ( ?, ?, ?)",
                [
                    crypto.pbkdf2Sync("pass", salt, 310000, 32, "sha256"),
                    salt,
                    "ethan@gmail.com"
                ],
            );
            await dbRun(db,
                "INSERT OR IGNORE INTO users_info (user_id, name, email, phone_no) VALUES ((SELECT id FROM users_auth WHERE email = ?), ?, ?, ?)",
                [
                    "ethan@gmail.com",
                    "Ethan",
                    "ethan@gmail.com",
                    "81231234"
                ],
            );
        });
    }
});

module.exports = db;

