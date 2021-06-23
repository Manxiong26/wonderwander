const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET request to grab artist detail info
router.get('/:id', (req, res) => {
    const query = `SELECT artist.name, artist.image, artist.bio, artist.site_link, artwork.name as title, artwork.image as art_pic FROM artist 
    JOIN artwork ON artwork.artist_id=artist.id
    WHERE artist.id=$1 AND artist.published=true AND artwork.published=true;`;

    pool.query(query, [artistId])
      .then(result => {
        // console.log(result.rows);
        res.send(result.rows[0])
      })
      .catch( error => {
        console.log('Something went wrong GETting artist detail:', error)
        res.sendStatus(500);
      })
  });

module.exports = router;