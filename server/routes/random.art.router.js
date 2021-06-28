const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//need to add the random nature to this part, currently just grabs the first artwork
router.get('/', (req, res) => {
    const queryText = `SELECT artist."name" AS artist_name, artwork."name", artwork.image
    FROM  (
       SELECT DISTINCT 1 + trunc(random() * 10)::integer AS id
       FROM   generate_series(1,10) g
       ) r
    JOIN   artwork USING (id)
    JOIN artist ON artist.id = artwork.artist_id
    LIMIT  1;`;
    pool.query(queryText)
        .then(result => {
            res.send(result.rows[0]);
        })
        .catch(error => {
            console.log('Error with getting random art', error);
            res.sendStatus(500);
        })
})

module.exports = router;