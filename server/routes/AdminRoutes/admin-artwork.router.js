const express = require('express');
const {
  rejectUnauthenticated, rejectNonAdmin
} = require('../../modules/authentication-middleware');
const pool = require('../../modules/pool');
const router = express.Router();

//gets all artwork from DB to display on admin artwork page as li's
router.get('/', rejectUnauthenticated, rejectNonAdmin, (req, res) => {  //rejectUnauthenticated,

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
router.get('/:id', rejectUnauthenticated, rejectNonAdmin, (req, res) => {  //rejectUnauthenticated,
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

//gets all SEEs' info for a specific artwork from DB to store in seeListArtwork reducer
router.get('/:id/see', rejectUnauthenticated, rejectNonAdmin, (req, res) => {  

    //returns all SEE info to reducer
    const query = `SELECT * FROM "see" WHERE "artwork_id" = $1;`; 
    pool.query(query, [req.params.id])
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error see GET', error);
        res.sendStatus(500)
    })

});//end GET all SEEs for a specific artwork

//gets all DOs' info for a specific artwork from DB to store in doListArtwork reducer
router.get('/:id/do', rejectUnauthenticated, rejectNonAdmin, (req, res) => {  

    //returns all DO info to reducer
    const query = `SELECT * FROM "do" WHERE "artwork_id" = $1;`; 
    pool.query(query, [req.params.id])
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error do GET', error);
        res.sendStatus(500)
    })

});//end GET all DOs for a specific artwork

//adds new artwork to the DB from admin artwork page
router.post('/', rejectUnauthenticated, rejectNonAdmin, (req, res) => {  //rejectUnauthenticated,

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

//adds new 'See' for artwork to the DB from admin artwork page
router.post('/see', rejectUnauthenticated, rejectNonAdmin, (req, res) => {  

    let newSee = req.body;
    
    const query  = `INSERT INTO "see" ("prompts", "link", "artwork_id", "activity_id")
        VALUES ($1, $2, $3, $4);`;
    pool.query(query, [newSee.prompts, newSee.link, newSee.artwork_id, newSee.activity_id])
    .then(result => {
        console.log(`new 'See' for artwork object POST`, result.rows);
        res.sendStatus(201);
    }).catch (error => {
        console.log(error);
        res.sendStatus(500)
    })
  
});//end add new 'See' for artwork POST route

//adds new 'Do' for artwork to the DB from admin artwork page
router.post('/do', rejectUnauthenticated, rejectNonAdmin, (req, res) => {  

    let newDo = req.body;
    
    const query  = `INSERT INTO "do" ("prompts", "artwork_id", "activity_id")
        VALUES ($1, $2, $3);`;
    pool.query(query, [newDo.prompts, newDo.artwork_id, newDo.activity_id])
    .then(result => {
        console.log(`new 'Do' for artwork object POST`, result.rows);
        res.sendStatus(201);
    }).catch (error => {
        console.log(error);
        res.sendStatus(500)
    })
  
});//end add new 'Do' for artwork POST route

//PUT route to edit an artwork's information 
router.put('/:id', rejectUnauthenticated, rejectNonAdmin, (req, res) => { //rejectUnauthenticated,
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

//PUT route to publish an artwork's information 
router.put('/publish/:id', rejectUnauthenticated, rejectNonAdmin, (req, res) => { 
    console.log('put id:', req.params.id);
    console.log('put update body:', req.body);

    let artwork = req.body;
    
    const query = `UPDATE "artwork" SET published=$2 WHERE id=$1;`;
    
    pool.query(query, [req.params.id, artwork.published])
    .then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('Error updating artwork publish in server:', error);
        res.sendStatus(500)
    })
  
});//end artwork PUT route
  
//DELETE route to delete an artwork
router.delete('/:id', rejectUnauthenticated, rejectNonAdmin, (req, res) => { //rejectUnauthenticated,
  
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