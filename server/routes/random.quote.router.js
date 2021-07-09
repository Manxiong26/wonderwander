const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// get request to get random quote from the database
router.get('/', (req, res) => {
    // will general random value for id, then get item for that id, limited to 1
    const queryText = ` SELECT * FROM quotes where id >= (
        SELECT random()*(max(id)-min(id))+min(id) FROM quotes
      )
      ORDER BY id
      LIMIT 1;`;

    pool.query(queryText)

        // will send back that single item
        .then(result => {
            res.send(result.rows[0]);
        })

        // error if there is one
        .catch(error => {
            console.log('Error with getting random quote: ', error);
            res.sendStatus(500);
        })
})

module.exports = router;