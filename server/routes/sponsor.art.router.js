const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// router get request for art for a specific sponsor
router.get('/:id', (req, res) => {

    // gets all from the sponsor where the sponsor id is the one sent from the client, request params id, ordered by the artwork.id
    const queryText = `SELECT * FROM "sponsor"
    JOIN "artwork" ON artwork.sponsor_id = sponsor.id
    WHERE sponsor.id = $1
    ORDER BY artwork.id ASC;`

    pool.query(queryText, [req.params.id])

        // success will send back data to client 
        .then(result => {
            res.send(result.rows);
        })

        // failure will send back error code
        .catch(error => {
            console.log('Error with getting sponsor art', error);
            res.sendStatus(500);
        })
})

module.exports = router;