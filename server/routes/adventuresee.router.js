const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


// Grabbing See Prompts for specific Adventure Item
router.get('/:id', (req, res) => {
    console.log('Adventure ID: ', req.params);
    const queryText = `SELECT * FROM "see" WHERE "see".activity_id = $1 AND published = true;`;
    pool.query(queryText, [req.params.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error GETting See Prompt for Adventure: ', error);
            res.sendStatus(500);
        })
})


module.exports = router;