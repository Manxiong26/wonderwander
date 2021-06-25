const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//need to add the random nature to this part, currently just grabs the first quote
router.get('/', (req, res) => {
    console.log('Start of the do page', req.params);
    const queryText = `
    SELECT "do".prompts AS doprompts FROM "do" JOIN "artwork" ON "artwork".id = "do".artwork_id;`
    pool.query(queryText, req.params.id)
        .then(result => {
            console.log('END OF THE DO PAGE HELLO', req.params);
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error with getting random quote', error);
            res.sendStatus(500);
        })
})

//This is the router for the poll Say
router.get('/:id', (req, res) => {
    // console.log('Start of the do page', req.params);
    const queryText = `
    SELECT prompts FROM "say" WHERE id=$1;
    ;`
    pool.query(queryText, [req.params.id])
        .then(result => {
            // console.log('END OF THE DO PAGE HELLO', req.params);
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error with getting random quote', error);
            res.sendStatus(500);
        })
})


// SEE PAGE ROUTER
// router.get('/', (req, res) => {
//     console.log('Start of the see page', req.params);
//     const queryText = `
//     SELECT "see".id, "see".prompts, "see".artwork_id FROM "see" JOIN "artwork" ON "artwork".id = "see".artwork_id;`;
//     pool.query(queryText, [req.params.id])
//         .then(result => {
//             console.log('END OF THE SEE PAGE', req.params);
//             res.send(result.rows);
//         })
//         .catch(error => {
//             console.log('Error with getting see', error);
//             res.sendStatus(500);
//         })
// })


module.exports = router;

