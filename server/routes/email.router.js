const express = require('express');
const { resetWarningCache } = require('prop-types');
const pool = require('../modules/pool');
const router = express.Router();

// post route to post the email information from the client
router.post('/', (req, res) => {

    // new variable set to request body
    let newEmail = req.body;

    // insert into emailSignUp table
    const queryText = `INSERT INTO "emailSignUp" ("email", "first_name", "last_name")
        VALUES ($1, $2, $3);`;
    pool.query(queryText, [newEmail.email, newEmail.firstName, newEmail.lastName])

        // success will send back ok code
        .then(result => {
            res.sendStatus(201);

        // failure will send error code
        }).catch(error => {
            console.log('Error with posting email info to database:', error)
            res.sendStatus(500);
        })
});

module.exports = router;
