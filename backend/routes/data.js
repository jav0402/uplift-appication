const express = require('express');
const router = express.Router();

const { dbRun } = require('../utils/db-async');
const db = require('../utils/database-init');

router.post('/quiz', async (req, res) => {
    let columns = Object.keys(req.body).join(',');
    let placeholders = Object.keys(req.body).map(() => '?').join(',');
    let values = Object.values(req.body);

    let query = `INSERT INTO quiz (${columns}) VALUES (${placeholders})`;
    dbRun(db, query, values)
        .then(() => res.status(200).send("Quiz results updated successfully"))
        .catch((error) => {
            console.log(error);
            return res.status(500).send("Error updating quiz results");
        });


});

router.post('/mood', async (req, res) => {
    let columns = Object.keys(req.body).join(',');
    let placeholders = Object.keys(req.body).map(() => '?').join(',');
    let values = Object.values(req.body);

    let query = `INSERT INTO mood (${columns}) VALUES (${placeholders})`;
    dbRun(db, query, values)
        .then(() => res.status(200).send("Mood data updated successfully"))
        .catch((error) => {
            console.log(error);
            return res.status(500).send("Error updating mood data");
        });

});

module.exports = router;
