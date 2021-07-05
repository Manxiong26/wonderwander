const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


// SEE PAGE GET ROUTE to grab See prompt 
// based on specific artwork ID
router.get('/:id', (req, res) => {
    console.log('Inside GET of see.router...Artwork ID: ', req.params);
    const queryText = `
    SELECT "see".id, "see".prompts, "see".link, "see".image FROM "see" WHERE "see".artwork_id = $1;`;
    pool.query(queryText, [req.params.id])
        .then(result => {
            // console.log('END OF THE SEE PAGE', req.params);
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error inside GET of see.router: ', error);
            res.sendStatus(500);
        })
})


module.exports = router;