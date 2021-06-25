const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


// SEE PAGE ROUTER
router.get('/', (req, res) => {
    console.log('Start of the see page', req.params);
    const queryText = `
    SELECT "say".prompts FROM "say";`;
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


module.exports = router;