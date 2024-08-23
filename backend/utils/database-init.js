var crypto = require("crypto");
const sqlite3 = require("sqlite3").verbose();

var db = new sqlite3.Database("./database.db", function (err) {
  if (err) {
    console.error(err);
    process.exit(1); // bail out we can't connect to the DB
  } else {
    console.log("Database connected");
    db.run("PRAGMA foreign_keys=ON"); // tell SQLite to pay attention to foreign key constraints
    // create initial user author (username: admin, password: passwd)
    var salt = crypto.randomBytes(16);

    db.get("SELECT * FROM users_auth", function (err, row) {
      if (row) {
        return;
      }
      // Create an admin users
      db.run(
        "INSERT OR IGNORE INTO users_auth (username, hashed_password, salt, email) VALUES (?, ?, ?, ?)",
        [
          "xavier",
          crypto.pbkdf2Sync("passwd", salt, 310000, 32, "sha256"),
          salt,
            "xavier@gmail.com"
        ],
      );
      db.run(
        "INSERT OR IGNORE INTO users_auth (username, hashed_password, salt, email) VALUES (?, ?, ?, ?)",
        ["shad", crypto.pbkdf2Sync("pass", salt, 310000, 32, "sha256"), salt, "shad@gmail.com"],
      );
    });
  }
});

module.exports = db;

