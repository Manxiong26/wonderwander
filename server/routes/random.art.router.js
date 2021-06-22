const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//need to add the random nature to this part, currently just grabs the first artwork
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "artwork" WHERE artwork.id = $1`
    pool.query(queryText, [1])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error with getting random quote', error);
            res.sendStatus(500);
        })
})

module.exports = router;