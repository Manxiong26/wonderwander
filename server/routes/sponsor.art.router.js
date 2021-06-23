const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/:id', (req, res) => {
    console.log(req.body);
    const queryText = `SELECT * FROM "sponsor"
    JOIN "artwork" ON artwork.sponsor_id = sponsor.id
    WHERE sponsor.id = $1
    ORDER BY artwork.id ASC;`

    pool.query(queryText, [req.body])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error with getting sponsor art', error);
            res.sendStatus(500);
        })
})

module.exports = router;