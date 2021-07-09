const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


// get route to get the do page contents from the server, for that specific do
router.get('/:id', (req, res) => {

    // queryText to select from the Do table where the activity id is the one provided 
    const queryText = `
    SELECT "do".id, "do".prompts FROM "do" WHERE "do".activity_id = $1;`;
    pool.query(queryText, [req.params.id])

        // successful query = send back info to client
        .then(result => {
            res.send(result.rows);
        })
        
        // unsuccessful = send error
        .catch(error => {
            console.log('Error with getting see', error);
            res.sendStatus(500);
        })
})


module.exports = router;