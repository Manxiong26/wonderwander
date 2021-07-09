const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// router get request to get viewed art from the server
router.get('/', (req, res) => {
  const user_id = req.user.id;

  // will select all from the artwork_seen table for the specific user, specified by request user id
  const query = `SELECT * FROM artwork_seen WHERE users_id = $1;`

  pool.query(query, [user_id])

    // success will send back data
    .then(result => {
      res.send(result.rows)
    })

    // error if one occurs
    .catch(err => {
      console.log(`ERROR getting artwork_seen details: `, err)
    })
})


module.exports = router;