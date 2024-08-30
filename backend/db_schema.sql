-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS users_auth (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    -- username TEXT UNIQUE NOT NULL,
    hashed_password BLOB,
    salt BLOB,
    email TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS users_info (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone_no TEXT,
    FOREIGN KEY(user_id) REFERENCES users_auth(id)
    FOREIGN KEY(email) REFERENCES users_auth(email)
    -- username TEXT UNIQUE NOT NULL,
    -- FOREIGN KEY(username) REFERENCES users_auth(username)
);

CREATE TABLE IF NOT EXISTS quiz (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE NOT NULL,
    anxiety INTEGER,
    depression INTEGER,
    other INTEGER,
    date TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users_info(id)
);

CREATE TABLE IF NOT EXISTS mood (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    mood INTEGER NOT NULL,
    Work INTEGER NOT NULL,
    School INTEGER NOT NULL,
    Love INTEGER NOT NULL,
    Friends INTEGER NOT NULL,
    Family INTEGER NOT NULL,
    Money INTEGER NOT NULL,
    Health INTEGER NOT NULL,
    Life INTEGER NOT NULL,
    None INTEGER NOT NULL,
    date TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users_info(id)
);

-- Insert default data (if necessary here)

-- database-init.js is used to insert default data into the database as it requires the crypt module to has the password and salt

COMMIT;


