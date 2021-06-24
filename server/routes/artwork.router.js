const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET request to grab all artwork info
// where published = true
router.get('/', (req, res) => {
    const query = `SELECT artwork.id, artwork.name as title, artwork.year, artwork.lat, artwork.long, artwork.image, artwork.description, artwork.vid_link, artwork.vid_description, artist.name, artist.bio, artist.site_link FROM artwork
    JOIN artist ON artist.id=artwork.id
    WHERE artwork.published=true AND artist.published=true;`;

    pool.query(query)
      .then(result => {
        // console.log(result.rows);
        res.send(result.rows)
      })
      .catch( error => {
        console.log('Something went wrong GETting artwork:', error)
        res.sendStatus(500);
      })
  });

module.exports = router;
