const express = require('express');
const {
    rejectUnauthenticated, rejectNonAdmin
} = require('../../modules/authentication-middleware');
const pool = require('../../modules/pool');
const router = express.Router();

//gets all collections' info from DB to display on admin collection page as li's
router.get('/', rejectUnauthenticated, rejectNonAdmin, (req, res) => {

    //returns all collection info to reducer
    const query = `SELECT * FROM "collection" ORDER BY "name" ASC;`;
    pool.query(query)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error collection GET', error);
            res.sendStatus(500)
        })

});//end collection GET route

//gets one specific collection's info from DB to display on admin collection page for editing
router.get('/:id', rejectUnauthenticated, rejectNonAdmin, (req, res) => {

    //returns a specific collection's info to reducer
    const query = `SELECT * FROM "collection" WHERE id=$1;`;
    pool.query(query, [req.params.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error in specific collection GET', error);
            res.sendStatus(500)
        })

});//end one collection's info GET route

//adds new collection to the DB from admin collection page
router.post('/', rejectUnauthenticated, rejectNonAdmin, (req, res) => {

    let collection = req.body;

    const query = `INSERT INTO "collection" ("name", "image", "city", "state", 
        "bio", "donate_link", "site_link", "search_text")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;

    pool.query(query, [collection.name, collection.image, collection.city,
    collection.state, collection.bio, collection.donate_link,
    collection.site_link, collection.search_text])
        .then(result => {
            console.log('new collection object POST', result.rows);
            res.sendStatus(201);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500)
        })

});//end add new collection POST route

//PUT route to edit an collection's information 
router.put('/:id', rejectUnauthenticated, rejectNonAdmin, (req, res) => {

    let collection = req.body;

    const query = `UPDATE "collection" SET name=$2, image=$3, city=$4, state=$5, 
        bio=$6, donate_link=$7, site_link=$8, search_text=$9 WHERE id=$1;`;

    pool.query(query, [req.params.id, collection.name, collection.image, collection.city,
    collection.state, collection.bio, collection.donate_link, collection.site_link,
    collection.search_text])
        .then(response => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error updating collection in server:', error);
            res.sendStatus(500)
        })

});//end collection PUT route'

//PUT route to publish a collection's information 
router.put('/publish/:id', rejectUnauthenticated, rejectNonAdmin, (req, res) => {

    let collection = req.body;

    const query = `UPDATE "collection" SET published=$2 WHERE id=$1;`;
    pool.query(query, [req.params.id, collection.published])
        .then(response => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error updating collection publish in server:', error);
            res.sendStatus(500)
        })

});//end collection PUT route

//DELETE route to delete a collection
router.delete('/:id', rejectUnauthenticated, rejectNonAdmin, (req, res) => {

    const query = `DELETE FROM "collection" WHERE id=$1;`;
    pool.query(query, [req.params.id])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('error in delete', error);
            res.sendStatus(500);
        })

});//end collection DELETE route

module.exports = router;