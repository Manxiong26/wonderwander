const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


router.get('/', (req, res) => {
    const user_id = req.user.id;
    console.log('Checking user ID for artwork_seen: ', user_id);
  
    const query =  `SELECT * FROM artwork_seen WHERE users_id = $1;`
  
    pool.query(query, [user_id])
    .then(result => {
      res.send(result.rows)
      console.log(result.rows)
    })
    .catch(err => {
      console.log(`ERROR getting artwork_seen details: `, err)
    })
  })


  module.exports = router;