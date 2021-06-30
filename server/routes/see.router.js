const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


// SEE PAGE ROUTER
router.get('/:id', (req, res) => {
    console.log('Start of the see page', req.params);
    const queryText = `
    SELECT * FROM "see" WHERE "see".artwork_id = $1 AND published = true;`;
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