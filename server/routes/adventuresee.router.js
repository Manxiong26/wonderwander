const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


// Grabbing See Prompts for specific Adventure Item
router.get('/:id', (req, res) => {
    
    // query text to get all from the see table for the specific activity
    const queryText = `SELECT * FROM "see" WHERE "see".activity_id = $1 AND published = true;`;
    pool.query(queryText, [req.params.id])

        // success will send back data to client
        .then(result => {
            res.send(result.rows);
        })

        // failure will send back error
        .catch(error => {
            console.log('Error GETting See Prompt for Adventure: ', error);
            res.sendStatus(500);
        })
})


module.exports = router;