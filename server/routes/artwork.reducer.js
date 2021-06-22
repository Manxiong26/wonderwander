const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET request to grab all artwork info
router.get('/', (req, res) => {
    const query = `SELECT * FROM artwork;`;

    pool.query(query)
      .then(result => {
        // console.log(result.rows);
        res.send(result.rows)
      })
      .catch( error => {
        console.log('Something went wrong GETting artwork:', error)
        res.sendStatus(500);
      })
  });

module.exports = router;
