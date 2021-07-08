const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// get request to get a random piece of artwork from the server and send it back to the client
router.get('/', (req, res) => {

    // query text will generate random value for id, and then grab item for that id, limited to 1
    const queryText = `SELECT artist."name" AS artist_name, artwork."name", artwork.image
    FROM  (
       SELECT DISTINCT 1 + trunc(random() * 10)::integer AS id
       FROM   generate_series(1,10) g
       ) r
    JOIN   artwork USING (id)
    JOIN artist ON artist.id = artwork.artist_id
    LIMIT  1;`;
    pool.query(queryText)

        // success will send back that single random art to client
        .then(result => {
            res.send(result.rows[0]);
        })

        // failure will send error code
        .catch(error => {
            console.log('Error with getting random art', error);
            res.sendStatus(500);
        })
})

module.exports = router;