const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


// SEE PAGE ROUTER
router.get('/', (req, res) => {
    console.log('Start of the see page', req.params);
    const queryText = `
    SELECT "see".prompts, "see".artwork_id, "see".link FROM "see" JOIN "artwork" ON "artwork".id = "see".artwork_id 
    WHERE "see".artwork_id = $1;`;
    pool.query(queryText, [req.params.id])
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