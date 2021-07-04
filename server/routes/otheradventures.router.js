const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    const query = `SELECT * FROM "activities" WHERE "activities".published = true;`;
    pool.query(query)
      .then(result => {
        // console.log(result.rows);
        res.send(result.rows)
      })
      .catch( error => {
        console.log('Something went wrong getting other adventures:', error)
        res.sendStatus(500);
      })
  });


router.get('/:id', (req, res) => {
  const query = `SELECT * FROM "activities" WHERE "activities".id = $1 AND "activities".published = true;`;
  pool.query(query, [req.params.id])
  .then(result => {
    res.send(result.rows[0])
  })
  .catch(error => {
    console.log('ERROR GETting ActivityDetail: ', error);
    res.sendStatus(500);
  })
});

module.exports = router;