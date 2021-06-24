const express = require('express');
const {
  rejectUnauthenticated,
} = require('../../modules/authentication-middleware');
const pool = require('../../modules/pool');
const router = express.Router();

//gets all artists' info from DB to display on admin artist page as li's
router.get('/',  (req, res) => {  //rejectUnauthenticated,

    //returns all artist info to reducer
    const query = `SELECT * FROM "artist" ORDER BY "name" ASC;`;
    pool.query(query)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error artist GET', error);
        res.sendStatus(500)
    })

});//end artist GET route

//gets one specific artist's info from DB to display on admin artist page for editing
router.get('/:id',  (req, res) => {  //rejectUnauthenticated,
    console.log(`in one artist's info get, id:`, req.params.id);
    
    //returns a specific artist's info to reducer
    const query = `SELECT name, image, bio, site_link FROM "artist" WHERE id=$1;`;
    pool.query(query, [req.params.id])
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error in specific artist GET', error);
        res.sendStatus(500)
    })
  
});//end one artist's info GET route

//adds new artist to the DB from admin artist page
router.post('/',  (req, res) => {  //rejectUnauthenticated,

    let artist = req.body;
    
    const query  = `INSERT INTO "artist" ("name", "image", "bio", "site_link")
        VALUES ($1, $2, $3, $4);`;
    pool.query(query, [artist.name, artist.image, artist.bio, artist.site_link])
    .then(result => {
        console.log('new artist object POST', result.rows);
        res.sendStatus(201);
    }).catch (error => {
        console.log(error);
        res.sendStatus(500)
    })
  
});//end add new client POST route

//PUT route to edit an artist's information 
router.put('/:id',  (req, res) => { //rejectUnauthenticated,
    console.log('put id:', req.params.id);
    console.log('put update body:', req.body);

    let artist = req.body;
    
    const query = `UPDATE "artist" SET name=$2, image=$3, bio=$4, 
        site_link=$5 WHERE id=$1;`;
    pool.query(query, [req.params.id, artist.name, artist.image, artist.bio, artist.site_link])
    .then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('Error updating artist in server:', error);
        res.sendStatus(500)
    })
  
});//end PUT route
  
//DELETE route to delete an artist
router.delete('/:id',  (req, res) => { //rejectUnauthenticated,
  
    const query = `DELETE FROM "artist" WHERE id=$1;`;
    pool.query(query, [req.params.id]) 
    .then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error in delete', error);
        res.sendStatus(500);
    })
  
});//end DELETE route

module.exports = router;