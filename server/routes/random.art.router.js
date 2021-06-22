const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//need to add the random nature to this part, currently just grabs the first artwork
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM artwork where id >= (
        SELECT random()*(max(id)-min(id))+min(id) FROM artwork
      )
      ORDER BY id
      LIMIT 1;`
    pool.query(queryText)
        .then(result => {
            res.send(result.rows[0]);
        })
        .catch(error => {
            console.log('Error with getting random quote', error);
            res.sendStatus(500);
        })
})

module.exports = router;