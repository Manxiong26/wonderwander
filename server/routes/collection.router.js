const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let sqlText = `SELECT * FROM collection 
    WHERE published = true
    ORDER BY city ;
    `;

    pool.query(sqlText)
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('ERROR FETCHING COLLECTION', error);
            res.sendStatus(500)
        });
})

router.get('/city', (req, res) => {
    let sqlText = `SELECT * FROM collection WHERE published = true ORDER BY city LIMIT 3;`;

    pool.query(sqlText)
    .then((result) => {
        console.log(result.rows);
        res.send(result.rows)
    })
    .catch((error) => {
        console.log('ERROR FETCHING 3 COLLECTION', error);
        res.sendStatus(500)
    })
})

router.get('/:id', (req, res) => {
console.log('CHECKING THE ID', req.params);


    let sqlText = `SELECT collection.id, collection.image AS collection_image, 
    collection."name" AS collection_name, collection.city, collection.state, collection.bio, 
    collection.donate_link, collection.site_link, collection.search_text, artwork.id AS art_work_id, artwork."name" AS artwork_name, 
    artwork."year" AS artwork_year, artwork."lat", artwork."long", artwork.image AS artwork_image, 
    artwork.description AS artwork_description, artwork.vid_link, artwork.vid_description, 
    artwork.artist_id, artwork.sponsor_id, artwork.collection_id, artist."name" AS artist_name, 
    artist."image" AS artist_image, artist."bio" AS artist_bio, artist."site_link"
    FROM artwork 
    JOIN collection ON collection.id = artwork.collection_id
    JOIN artist ON artist.id = artwork.artist_id
    WHERE collection.id = $1 AND collection.published = true;`;

    pool.query(sqlText, [req.params.id])
        .then((result) => {
            console.log(result.rows);
            res.send(result.rows)
        })
        .catch((error) => {
            console.log('ERROR FETCHING THE COLLECTION ID', error);
            res.sendStatus(500)
        });
})


module.exports = router;