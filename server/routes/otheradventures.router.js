const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// router get request to get all adventures information where they are marked as published
router.get('/', (req, res) => {
  const query = `SELECT * FROM "activities" WHERE "activities".published = true;`;
  pool.query(query)

    // will send data on success
    .then(result => {
      res.send(result.rows)
    })

    // sends error code on failure
    .catch(error => {
      console.log('Something went wrong getting other adventures:', error)
      res.sendStatus(500);
    })
});

// get request to get specific adventure, based on idea in request params
router.get('/:id', (req, res) => {
  const query = `SELECT * FROM "activities" WHERE "activities".id = $1 AND "activities".published = true;`;
  pool.query(query, [req.params.id])

    // sends data on success, for that single item
    .then(result => {
      res.send(result.rows[0])
    })

    // failure will send error code
    .catch(error => {
      console.log('ERROR GETting ActivityDetail: ', error);
      res.sendStatus(500);
    })
});

module.exports = router;