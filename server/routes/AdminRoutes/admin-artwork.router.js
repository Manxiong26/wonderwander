const express = require('express');
const {
  rejectUnauthenticated,
} = require('../../modules/authentication-middleware');
const pool = require('../../modules/pool');
const router = express.Router();

//gets all artwork from DB to display on admin artwork page as li's
router.get('/', rejectUnauthenticated, (req, res) => {  //rejectUnauthenticated,

    //returns all artwork info to reducer
    const query = `SELECT * FROM "artwork" ORDER BY "name" ASC;`;
    pool.query(query)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error artwork GET', error);
        res.sendStatus(500)
    })

});//end artwork GET route

//gets one specific artwork from DB to display on admin artwork page for editing
router.get('/:id', rejectUnauthenticated, (req, res) => {  //rejectUnauthenticated,
    console.log(`in one artwork's info get, id:`, req.params.id);
    
    //returns a specific artwork's info to reducer
    const query = `SELECT * FROM "artwork" WHERE id=$1;`;
    pool.query(query, [req.params.id])
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error in specific artwork GET', error);
        res.sendStatus(500)
    })
  
});//end one artwork's info GET route

//adds new artwork to the DB from admin artwork page
router.post('/', rejectUnauthenticated, (req, res) => {  //rejectUnauthenticated,

    let artwork = req.body;
    
    const query  = `INSERT INTO "artwork" ("name", "year", "lat", "lng", "image", 
                    "description", "vid_link", "vid_description", "artist_id", 
                    "sponsor_id", "collection_id")
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;
    pool.query(query, [artwork.name, artwork.year, artwork.lat, artwork.lng, 
                    artwork.image, artwork.description, artwork.vid_link, 
                    artwork.vid_description, artwork.artist_id, artwork.sponsor_id, 
                    artwork.collection_id])
    .then(result => {
        console.log('new artwork object POST', result.rows);
        res.sendStatus(201);
    }).catch (error => {
        console.log(error);
        res.sendStatus(500)
    })
  
});//end add new artwork POST route

//PUT route to edit an artwork's information 
router.put('/:id', rejectUnauthenticated, (req, res) => { //rejectUnauthenticated,
    console.log('put id:', req.params.id);
    console.log('put update body:', req.body);

    let artwork = req.body;
    
    const query = `UPDATE "artwork" SET name=$2, year=$3, lat=$4, lng=$5, image=$6,
        description=$7, vid_link=$8, vid_description=$9, artist_id=$10, 
        sponsor_id=$11, collection_id=$12 WHERE id=$1;`;
    pool.query(query, [req.params.id, artwork.name, artwork.year, artwork.lat, 
                    artwork.lng, artwork.image, artwork.description, 
                    artwork.vid_link, artwork.vid_description, artwork.artist_id, 
                    artwork.sponsor_id, artwork.collection_id])
    .then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('Error updating artist in server:', error);
        res.sendStatus(500)
    })
  
});//end artwork PUT route
  
//DELETE route to delete an artwork
router.delete('/:id', rejectUnauthenticated, (req, res) => { //rejectUnauthenticated,
  
    const query = `DELETE FROM "artwork" WHERE id=$1;`;
    pool.query(query, [req.params.id]) 
    .then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error in delete', error);
        res.sendStatus(500);
    })
  
});//end artwork DELETE route

module.exports = router;