const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// say PAGE ROUTER to get specific say for artwork
router.get('/:id', (req, res) => {

    // will grab all the says from the database and send back to client
    const queryText = `
    SELECT * FROM "say";`;
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })

        // error if one occurs
        .catch(error => {
            console.log('Error with getting see', error);
            res.sendStatus(500);
        })
});

// Post route to post new poll information to client
router.post('/', (req, res) => {

    // query text to insert new vote into the say_poll database
    let queryText = `INSERT INTO "say_poll" ("say_id", "artwork_id") VALUES ($1, $2);`;
    pool.query(queryText, [req.body.say_id, req.body.artwork_id])

        // success will send back ok
        .then((result) => {
            res.sendStatus(201);

            // failure will send back error
        }).catch((error) => {
            console.log('ERROR IN SAY POST', error);
            res.sendStatus(500);
        })
});

// get rout for the count for specific id
router.get('/count/:id', (req, res) => {

    // will select the count for the say poll for specified artwork
    const queryText = `SELECT "say".id, "say".prompts, "say".image, COUNT (*)
    FROM "say_poll"
    JOIN "say"
    ON "say".id = "say_poll".say_id
    WHERE "say_poll".artwork_id = $1
    GROUP BY "say".id, "say".prompts, "say".image
    ORDER BY "say".id ASC;`;

    pool.query(queryText, [req.params.id])

        // success will send back the count and other information pertaining to say to the client
        .then(result => {
            res.send(result.rows);
        })

        // error if one occurs
        .catch(error => {
            console.log('Error with getting see', error);
            res.sendStatus(500);
        })
});

module.exports = router;