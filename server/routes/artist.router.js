const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET request to grab artist detail info
// Where published = true
router.get('/:id', (req, res) => {
  const artistId = req.params.id
  console.log('Artist ID: ', artistId)

  // query to get artist information for the specific artist
  const query = `SELECT artist.name, artist.image, artist.bio, artist.site_link, artwork.id as art_id, artwork.name as title, artwork.image as art_pic FROM artwork 
    JOIN artist ON artwork.artist_id=artist.id
    WHERE artist.id=$1 AND artist.published=true AND artwork.published=true;`;

  pool.query(query, [artistId])

    // success will send back data to client
    .then(result => {
      res.send(result.rows)
    })

    // failure will send back error
    .catch(error => {
      console.log('Something went wrong GETting artist detail:', error)
      res.sendStatus(500);
    })
});

module.exports = router;