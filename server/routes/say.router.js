const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


// SEE PAGE ROUTER
router.get('/', (req, res) => {
    console.log('Start of the see page', req.params);
    const queryText = `
    SELECT "say".prompts, "say".image FROM "say";`;
    pool.query(queryText)
        .then(result => {
            console.log('END OF THE SEE PAGE', req.params);
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error with getting see', error);
            res.sendStatus(500);
        })
})

router.put('/:id', (req, res) => {
    console.log('Adding vote', req.body);
    let queryText = `INSERT INTO "say_poll" ("say_id", "artwork_id") VALUES ($1, $2) RETURNING "id";`;
    pool.query(queryText, [req.body.say_id, req.body.artwork_id])
    .then((result) => {
        res.sendStatus(result.rows[0]);
    }).catch((error) => {
        console.log('ERROR IN SAY POST', error);
        res.sendStatus(500);
    })
})


module.exports = router;