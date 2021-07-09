const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// router get request to get the information for specific sponsor
router.get('/:id', (req, res) => {

    // details set to the request params id
    const details = req.params.id;

    // will get all the information from the sponsor for that ID
    const queryText = `SELECT * FROM "sponsor" WHERE sponsor.id = $1;`

    pool.query(queryText, [details])

        // success will send back the data to the client
        .then(result => {
            res.send(result.rows[0]);
        })

        //error for if one occurs
        .catch(error => {
            console.log('Error with getting sponsor details', error);
            res.sendStatus(500);
        })
});

module.exports = router;