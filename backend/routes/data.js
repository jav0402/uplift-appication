const express = require('express');
const router = express.Router();

const { dbRun, dbAll } = require('../utils/db-async');
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

router.get('/mood/:id', async (req, res) => {
    let query = `SELECT * FROM mood WHERE user_id = ${req.params.id}`;
    dbAll(db, query)
        .then((rows) => {
            if (!rows) return res.status(404).send("No mood data found");
            return res.status(200).send(rows)
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).send("Error retrieving mood data");
        });
})

router.get('/journal/:id', async (req, res) => {
    let query = `SELECT * FROM journal WHERE user_id = ${req.params.id}`;
    dbAll(db, query)
        .then((rows) => {
            if (!rows) return res.status(404).send("No journal data found");
            return res.status(200).send(rows)
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).send("Error retrieving journal data");
        });

})

router.post('/journal', async (req, res) => {
    let columns = Object.keys(req.body).join(',');
    let placeholders = Object.keys(req.body).map(() => '?').join(',');
    let values = Object.values(req.body);

    let query = `INSERT INTO journal (${columns}) VALUES (${placeholders})`;
    dbRun(db, query, values)
        .then(() => res.status(200).send("Journal data updated successfully"))
        .catch((error) => {
            console.log(error);
            return res.status(500).send("Error updating journal data");
        });
})

router.get('/resources/:type', async (req, res) => {
    let type = req.params.type;
    let query = `SELECT * FROM resources`;
    if (type != 'ALL') query += ` WHERE type = '${type}'`;
    dbAll(db, query)
        .then((rows) => {
            if (!rows) return res.status(404).send("No resources found");
            return res.status(200).send(rows)
        })
        .catch((error) => {
            console.log(error);
            return res.status(500).send("Error retrieving resources");
        });
});

module.exports = router;
