const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// router get request to get everything from the collection table where they are published and to order by the city
router.get('/', (req, res) => {
    let sqlText = `SELECT * FROM collection 
    WHERE published = true
    ORDER BY city ;
    `;

    pool.query(sqlText)

        // success will send back the data to client
        .then((result) => {
            res.send(result.rows)
        })

        // error will send back error code
        .catch((error) => {
            console.log('ERROR FETCHING COLLECTION', error);
            res.sendStatus(500)
        });
})

// get request to get just the 3 closest collections for the home page of the client
router.get('/city', (req, res) => {

    // will limit to just 3
    let sqlText = `SELECT * FROM collection WHERE published = true ORDER BY city LIMIT 3;`;

    pool.query(sqlText)

        // success will send back the data
        .then((result) => {
            res.send(result.rows)
        })

        // failure will send back error
        .catch((error) => {
            console.log('ERROR FETCHING 3 COLLECTION', error);
            res.sendStatus(500)
        })
})

// router get to get the specific collection information, determined by the id in the request params
router.get('/:id', (req, res) => {
    let sqlText = `SELECT collection.id AS collection_id, collection.image AS collection_image, 
    collection.name AS collection_name, collection.city, collection.state, collection.bio, 
    collection.donate_link, collection.site_link, collection.search_text, artwork.id, artwork.name AS artwork_name, 
    artwork.year AS artwork_year, artwork.lat, artwork.lng, artwork.image AS artwork_image, 
    artwork.description AS artwork_description, artwork.vid_link, artwork.vid_description, 
    artwork.artist_id, artwork.sponsor_id, artwork.collection_id
  FROM collection
    LEFT OUTER JOIN artwork ON collection.id = artwork.collection_id
  WHERE collection.id = $1 AND collection.published = true;`;

    pool.query(sqlText, [req.params.id])

        // success will send back data to client
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows)
        })

        // failure will send back error code
        .catch((error) => {
            console.log('ERROR FETCHING THE COLLECTION ID', error);
            res.sendStatus(500)
        });
})


module.exports = router;