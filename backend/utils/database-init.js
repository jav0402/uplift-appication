var crypto = require("crypto");
const sqlite3 = require("sqlite3").verbose();
const { dbGet, dbRun } = require("./db-async");
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

var db = new sqlite3.Database("./backend/database.db", function(err) {
    if (err) {
        console.error(err);
        process.exit(1); // bail out we can't connect to the DB
    } else {
        console.log("[db-init] Database connected");
        db.run("PRAGMA foreign_keys=ON"); // tell SQLite to pay attention to foreign key constraints
        db.serialize(async () => {
            try {
                // Check if there are existing users
                const userCount = await dbGet(db, "SELECT COUNT(*) AS count FROM users_auth");
                if (userCount > 0) {
                    console.log("[db-init] Users already exist in the users_auth table, skipping user creation.");
                } else {
                    await insertDefaultUsers();
                }

                // Check if data already exists in the resources table
                const resourceCount = await dbGet(db, "SELECT COUNT(*) AS count FROM resources");
                if (resourceCount > 0) {
                    console.log("[db-init] Data already exists in the resources table, skipping CSV import.");
                } else {
                    const resourcesPath = path.join(__dirname, '..', 'data', 'resources.csv');
                    await importCSV(resourcesPath, 'resources');
                }

            } catch (err) {
                console.error("[db-init] Error during database initialization:", err);
            }
        });
    }
});

// Function to insert mock users
async function insertDefaultUsers() {
    var salt = crypto.randomBytes(16);

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
}

// Function to import data from CSV
async function importCSV(filePath, tableName) {
    console.log(`[db-init] ${filePath} is being imported into ${tableName}.`);
    const records = [];
    let columns = [];

    // Read the CSV file and parse the data asynchronously
    const stream = fs.createReadStream(filePath)
        .pipe(csv())
        .on('headers', (headers) => {
            // Get the headers from the first row of the CSV file
            columns = headers;
            console.log('[db-init] Detected columns:', columns); // Debugging line to show detected columns
        })
        .on('data', (row) => {
            records.push(row);
        });

    // Wait for the CSV reading to finish
    await new Promise((resolve, reject) => {
        stream.on('end', resolve);
        stream.on('error', reject);
    });

    await insertData(records, tableName, columns);
    console.log(`[db-init] ${filePath} successfully imported into ${tableName}.`);
}

// Function to insert data into the SQLite database dynamically
async function insertData(data, tableName, columns) {
    await new Promise((resolve, reject) => {
        db.serialize(() => {
            // Create a dynamic SQL query
            const placeholders = columns.map(() => '?').join(', ');
            const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`;
            const statement = db.prepare(query);

            data.forEach(record => {
                const values = columns.map(column => record[column]);
                statement.run(values);
            });

            statement.finalize((err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(`[db-init] Data inserted into the ${tableName} table.`);
                    resolve();
                }
            });
        });
    });
}

module.exports = db;

