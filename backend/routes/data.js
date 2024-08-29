const express = require('express');
const router = express.Router();

const { dbRun } = require('../utils/db-async');
const db = require('../utils/database-init');

router.post('/quiz', async (req, res) => {
    try {
        const { user_id, anxiety, depression, other, date } = req.body;
        await dbRun(db, "INSERT INTO quiz (user_id, anxiety, depression, other, date) VALUES (?, ?, ?, ?, ?)", [user_id, anxiety, depression, other, date]);

        return res.status(200).send("Quiz results updated successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error updating quiz results");
    }

});

module.exports = router;
