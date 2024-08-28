-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-- Create your tables with SQL commands here (watch out for slight syntactical differences with SQLite vs MySQL)

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

-- Insert default data (if necessary here)

-- database-init.js is used to insert default data into the database as it requires the crypt module to has the password and salt

COMMIT;


