const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/:id', (req, res) => {
    const query = `SELECT "activities".id, "activities".image, "activities".description, "activities".title FROM "activities" WHERE "activities".id = $1;`;
    pool.query(query, [req.params.id])
      .then(result => {
        // console.log(result.rows);
        res.send(result.rows)
      })
      .catch( error => {
        console.log('Something went wrong getting other adventures:', error)
        res.sendStatus(500);
      })
  });

module.exports = router;