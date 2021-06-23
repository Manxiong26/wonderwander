const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let sqlText = `SELECT * FROM collection ORDER BY city;`;

    pool.query(sqlText)
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('ERROR FETCHING COLLECTION', error);
            res.sendStatus(500)
        });
})

router.get('/city', (req, res) => {
    let sqlText = `SELECT * FROM collection ORDER BY city LIMIT 3;`;

    pool.query(sqlText)
    .then((result) => {
        console.log(result.rows);
        res.send(result.rows)
    })
    .catch((error) => {
        console.log('ERROR FETCHING 3 COLLECTION', error);
        res.sendStatus(500)
    })
})



module.exports = router;