const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// get request to get just the do for a specific artwork
router.get('/:id', (req, res) => {
    const queryText = `
    SELECT * FROM "do" WHERE "do".artwork_id = $1 AND published='true';`
    pool.query(queryText, [req.params.id])

        // success sends back data to client
        .then(result => {
            res.send(result.rows);
        })

        // failure will send back error code
        .catch(error => {
            console.log('Error in GET route inside seesaydo.router: ', error);
            res.sendStatus(500);
        })
})


module.exports = router;

