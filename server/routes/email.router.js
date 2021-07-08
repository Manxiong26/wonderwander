const express = require('express');
const { resetWarningCache } = require('prop-types');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    console.log(req.body);
    let newEmail = req.body;
    const queryText = `INSERT INTO "emailSignUp" ("email", "first_name", "last_name")
        VALUES ($1, $2, $3);`;
    pool.query(queryText, [newEmail.email, newEmail.firstName, newEmail.lastName])
        .then(result => {
            res.sendStatus(201);
        }).catch (error => {
            console.log(error)
            res.sendStatus(500);
        })
});

module.exports = router;
