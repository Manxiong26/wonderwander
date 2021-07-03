const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


// GET request to grab all artwork info
router.get('/:id', (req, res) => {
    // console.log('testing', req.params.id);
 if(req.user === undefined){
    const query = `SELECT artwork.id AS artworkdetail_id, artwork."name" AS artwork_name, 
    artwork."year" AS artwork_year, artwork."lat", artwork."lng", artwork.image AS artwork_image, 
    artwork.description AS artwork_description, artwork.vid_link AS artwork_vidlink, artwork.vid_description, 
    artwork.artist_id, artwork.sponsor_id, artwork.collection_id, artist."name" AS artist_name,
    collection."name" AS collection_name, sponsor."name" AS sponsor_name  
    FROM "artwork" JOIN "artist" ON "artist".id = "artwork".artist_id
    JOIN "collection" ON "collection".id = "artwork".collection_id
    JOIN "sponsor" ON "sponsor".id = "artwork".sponsor_id WHERE artwork.id = $1 AND artwork.published = true;`;
    pool.query(query, 
      [req.params.id]
      )
      .then(result => {
        // console.log('Helllo!!!!', result.rows);
        res.send(result.rows[0])
      })
      .catch( error => {
        console.log('Something went wrong Getting artwork:', error)
        res.sendStatus(500);
      })
  } else {

  const query = `SELECT artwork.id AS artworkdetail_id, artwork."name" AS artwork_name, 
    artwork."year" AS artwork_year, artwork."lat", artwork."lng", artwork.image AS artwork_image, 
    artwork.description AS artwork_description, artwork.vid_link AS artwork_vidlink, artwork.vid_description, 
    artwork.artist_id, artwork.sponsor_id, artwork.collection_id, artist."name" AS artist_name,
    collection."name" AS collection_name, sponsor."name" AS sponsor_name,  
    (SELECT COUNT(*) FROM artwork_seen WHERE artwork_id = $1 AND users_id = $2) = 1 AS has_seen
    FROM "artwork" JOIN "artist" ON "artist".id = "artwork".artist_id
    JOIN "collection" ON "collection".id = "artwork".collection_id
    JOIN "sponsor" ON "sponsor".id = "artwork".sponsor_id WHERE artwork.id = $1 AND artwork.published = true;`;
    pool.query(query, 
      [req.params.id, req.user.id]
      )
      .then(result => {
        // console.log('Helllo!!!!', result.rows);
        res.send(result.rows[0])
      })
      .catch( error => {
        console.log('Something went wrong Getting artwork:', error)
        res.sendStatus(500);
      })
  }
    
  });


router.post('/', rejectUnauthenticated, (req, res) => {
  const users_id = req.user.id
  const artwork_id = req.body.artworkdetail_id
  console.log('CHECKING REQSSSSSSSS', req.body, users_id, artwork_id);
  console.log('CHECCCCKKKIINNNGGG ID', users_id);
  
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