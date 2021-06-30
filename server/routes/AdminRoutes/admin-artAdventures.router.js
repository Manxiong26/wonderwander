const express = require('express');
const {
  rejectUnauthenticated,
} = require('../../modules/authentication-middleware');
const pool = require('../../modules/pool');
const router = express.Router();

//gets all art adventures' info from DB to display on admin art adventure page as li's
router.get('/', rejectUnauthenticated, (req, res) => {  


    //returns all adventure info to reducer
    const query = `SELECT * FROM "activities" ORDER BY "title" ASC;`;
    pool.query(query)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error art adventure GET', error);
        res.sendStatus(500)
    })

});//end art adventure GET route

//gets one specific art adventure's info from DB to display on admin art adventure page for editing
router.get('/:id', rejectUnauthenticated, (req, res) => {  

    console.log(`in one art adventure's info get, id:`, req.params.id);
    
    //returns a specific art adventure's info to reducer
    const query = `SELECT * FROM "activities" WHERE id=$1;`;
    pool.query(query, [req.params.id])
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error in specific art adventure GET', error);
        res.sendStatus(500)
    })
  
});//end one art adventure's info GET route

//gets all SEEs' info for a specific adventure from DB to store in seeList reducer
router.get('/:id/see', rejectUnauthenticated, (req, res) => {  

    //returns all SEE info to reducer
    const query = `SELECT * FROM "see" WHERE "activity_id" = $1;`; 
    pool.query(query, [req.params.id])
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error see GET', error);
        res.sendStatus(500)
    })

});//end GET all SEEs for a specific art adventure

//gets all DOs' info for a specific adventure from DB to store in doList reducer
router.get('/:id/do', rejectUnauthenticated, (req, res) => {  

    //returns all DO info to reducer
    const query = `SELECT * FROM "do" WHERE "activity_id" = $1;`; 
    pool.query(query, [req.params.id])
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error do GET', error);
        res.sendStatus(500)
    })

});//end GET all DOs for a specific art adventure

//adds new art adventure to the DB from admin art adventure page
router.post('/', rejectUnauthenticated, (req, res) => {  

    let artAdventure = req.body;
    
    const query  = `INSERT INTO "activities" ("title", "description", "image")
        VALUES ($1, $2, $3);`;

    if(req.isAuthenticated() && req.user.admin) {
    pool.query(query, [artAdventure.title, artAdventure.description, artAdventure.image])
    .then(result => {
        console.log('new art adventure object POST', result.rows);
        res.sendStatus(201);
    }).catch (error => {
        console.log(error);
        res.sendStatus(500)
    })
} else {
    res.sendStatus(403)
}
  
});//end add new art adventure POST route

//adds new 'See' for adventure to the DB from admin art adventure page
router.post('/see', rejectUnauthenticated, (req, res) => {  

    let newSee = req.body;
    
    const query  = `INSERT INTO "see" ("prompts", "link", "artwork_id", "activity_id")
        VALUES ($1, $2, $3, $4);`;
    pool.query(query, [newSee.prompts, newSee.link, newSee.artwork_id, newSee.activity_id])
    .then(result => {
        console.log(`new 'See' for adventure object POST`, result.rows);
        res.sendStatus(201);
    }).catch (error => {
        console.log(error);
        res.sendStatus(500)
    })
  
});//end add new 'See' for adventure POST route

//adds new 'Do' for adventure to the DB from admin art adventure page
router.post('/do', rejectUnauthenticated, (req, res) => {  

    let newDo = req.body;
    
    const query  = `INSERT INTO "do" ("prompts", "artwork_id", "activity_id")
        VALUES ($1, $2, $3);`;
    pool.query(query, [newDo.prompts, newDo.artwork_id, newDo.activity_id])
    .then(result => {
        console.log(`new 'Do' for adventure object POST`, result.rows);
        res.sendStatus(201);
    }).catch (error => {
        console.log(error);
        res.sendStatus(500)
    })
  
});//end add new 'Do' for adventure POST route

//PUT route to edit an art adventure's information 
router.put('/:id', rejectUnauthenticated, (req, res) => { 
    console.log('put id:', req.params.id);
    console.log('put update body:', req.body);

    let artAdventure = req.body;
    
    const query = `UPDATE "activities" SET title=$2, description=$3, image=$4 
        WHERE id=$1;`;
    if(req.isAuthenticated() && req.user.admin) {
    pool.query(query, [req.params.id, artAdventure.title, artAdventure.description, 
        artAdventure.image])
    .then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('Error updating art adventure in server:', error);
        res.sendStatus(500)
    })
} else {
    res.sendStatus(403)
}
  
});//end art adventure PUT route
  
//DELETE route to delete an art adventure
router.delete('/:id', rejectUnauthenticated, (req, res) => { 
  
    const query = `DELETE FROM "activities" WHERE id=$1;`;
    if(req.isAuthenticated() && req.user.admin) {
    pool.query(query, [req.params.id]) 
    .then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error in delete', error);
        res.sendStatus(500);
    })
} else {
    res.sendStatus(403)
}
});//end art adventure DELETE route

module.exports = router;