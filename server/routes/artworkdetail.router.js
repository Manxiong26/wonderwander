const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET for specific artwork detail
router.get('/:id', (req, res) => {

  // id comes from the request params
  const artwork_id = req.params.id;
  const query = `SELECT * FROM artwork WHERE artwork.id = $1 AND published=true;`;
  pool.query(query, [artwork_id])

    //success will send back the first data row to the user, for the specific, singular piece of artwork
    .then(result => {
      res.send(result.rows[0])
    })

    // failure will send back error code
    .catch(err => {
      console.log('ERROR in GET of artwork detail: ', err)
    })
})

router.post('/', rejectUnauthenticated, (req, res) => {
  const users_id = req.user.id
  const artwork_id = req.body.id

  let sqlText = `INSERT INTO artwork_seen (users_id, artwork_id)
  VALUES ($1, $2);`;

  pool.query(sqlText, [users_id, artwork_id])
    .then(result => {
      res.sendStatus(201)
    })
    .catch(error => {
      console.log('ERROR ADDING ARTWORK', error);
      res.sendStatus(500)
    })
})

module.exports = router;