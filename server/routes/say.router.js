const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


// SEE PAGE ROUTER
router.get('/:id', (req, res) => {
    console.log('Start of the see page', req.params);
    const queryText = `
    SELECT * FROM "say";`;
    pool.query(queryText)
        .then(result => {
            console.log('END OF THE SEE PAGE', req.params);
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error with getting see', error);
            res.sendStatus(500);
        })
});

// NUMBER GET ROUTE

router.post('/', (req, res) => {
    console.log('Adding vote', req.body);
    let queryText = `INSERT INTO "say_poll" ("say_id", "artwork_id") VALUES ($1, $2);`;
    pool.query(queryText, [req.body.say_id, req.body.artwork_id])
    .then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('ERROR IN SAY POST', error);
        res.sendStatus(500);
    })
});


router.get('/count/:id', (req, res) => {
    console.log('Start of the see page vote', req.params);
    const queryText = `
    SELECT "say_poll".say_id, COUNT (*) FROM "say_poll" JOIN "say" ON "say".id = "say_poll".say_id WHERE "say_poll".artwork_id = $1 GROUP BY "say_poll".say_id ORDER BY "say_poll".say_id ASC;`;
    pool.query(queryText, [req.params.id])
        .then(result => {
            console.log('END OF THE SEE PAGE vOTE', req.params);
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error with getting see', error);
            res.sendStatus(500);
        })
});

module.exports = router;