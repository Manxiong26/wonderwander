const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');



router.get('/:id', (req, res) => {
    const details = req.params.id;

    const queryText = `SELECT * FROM "sponsor" WHERE sponsor.id = $1;`
    pool.query(queryText, [details])
    .then(result => {
        res.send(result.rows[0]);
    })
    .catch(error => {
        console.log('Error with getting sponsor details', error);
        res.sendStatus(500);
    })
});

module.exports = router;