const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//need to add the random nature to this part, currently just grabs the first artwork
router.get('/', (req, res) => {
    const queryText = `SELECT artist.name AS artist_name, artwork.name, artwork.image FROM artwork JOIN artist ON artist.id = artwork.artist_id
    WHERE artwork.id >= (
      SELECT random()*(max(artwork.id)-min(artwork.id))+min(artwork.id) FROM artwork
      )
      ORDER BY artwork.id
      LIMIT 1;`;
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