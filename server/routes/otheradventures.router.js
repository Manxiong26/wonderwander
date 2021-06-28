const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    const query = `SELECT "activities".id, "activities".image, "activities".description, "activities".title FROM "activities" WHERE "activities".published = true;`;
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
  const query = `SELECT "activities".id, "activities".image, "activities".description, "activities".title FROM "activities" 
  JOIN "see" ON "see".activity_id = "activities".id
  JOIN "do" ON "do".activity_id = "activities".id WHERE "activities".id = $1 AND "activities".published = TRUE;`;
  pool.query(query, [req.params.id])
  .then(result => {
    res.send(result.rows)
  })
  .catch(error => {
    console.log('Something went wrong with getting id of adventures', error);
    res.sendStatus(500);
  })
});

module.exports = router;