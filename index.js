
const express = require('express');
const app = express();
// const session = require('express-session');
const path = require('path');

const port = 3000;

app.set('view engine', 'ejs'); // set the app to use ejs for rendering

// Set location of static files (CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

const sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('./database.db', function(err) {
    if (err) {
        console.error(err);
        process.exit(1); // Exit the process if database connection fails
    } else {
        console.log("Database connected");
        global.db.run("PRAGMA foreign_keys=ON"); // Enable foreign key constraints
    }
});

// Handle requests to the home page 
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
