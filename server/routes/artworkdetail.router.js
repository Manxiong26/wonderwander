const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET request to grab all artwork info
router.get('/:id', (req, res) => {
    console.log(req.params.id);
    
    const query = `SELECT artwork."name" AS artwork_name, 
    artwork."year" AS artwork_year, artwork."lat", artwork."long", artwork.image AS artwork_image, 
    artwork.description AS artwork_description, artwork.vid_link AS artwork_vidlink, artwork.vid_description, 
    artwork.artist_id, artwork.sponsor_id, artwork.collection_id, artist."name" AS artist_name,
    collection."name" AS collection_name, sponsor."name" AS sponsor_name  
    FROM "artwork" JOIN "artist" ON "artist".id = "artwork".artist_id
    JOIN "collection" ON "collection".id = "artwork".collection_id
    JOIN "sponsor" ON "sponsor".id = "artwork".sponsor_id WHERE artwork.id = $1 AND artwork.published = true;`;
    
    pool.query(query, [req.params.id])
      .then(result => {
        console.log('Helllo!!!!', result.rows);
        res.send(result.rows[0])
      })
      .catch( error => {
        console.log('Something went wrong Getting artwork:', error)
        res.sendStatus(500);
      })
  });

module.exports = router;