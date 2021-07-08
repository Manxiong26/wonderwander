const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


// SEE PAGE GET ROUTE to grab See prompt 
// based on specific artwork ID
router.get('/:id', (req, res) => {

    // grabs see information for specific artwork
    const queryText = `
    SELECT "see".id, "see".prompts, "see".link, "see".image FROM "see" WHERE "see".artwork_id = $1;`;
    pool.query(queryText, [req.params.id])

        // success will send back data to client
        .then(result => {
            res.send(result.rows);
        })

        // failure will send error code
        .catch(error => {
            console.log('Error inside GET of see.router: ', error);
            res.sendStatus(500);
        })
})


module.exports = router;