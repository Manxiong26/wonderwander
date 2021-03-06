const express = require('express');
const {
    rejectUnauthenticated, rejectNonAdmin
} = require('../../modules/authentication-middleware');
const pool = require('../../modules/pool');
const router = express.Router();

//gets all sponsors' info from DB to display on admin sponsor page as li's
router.get('/', rejectUnauthenticated, rejectNonAdmin, (req, res) => {

    //returns all sponsor info to reducer
    const query = `SELECT * FROM "sponsor" ORDER BY "name" ASC;`;
    pool.query(query)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error sponsor GET', error);
            res.sendStatus(500)
        })

});//end sponsor GET route

//gets one specific sponsor's info from DB to display on admin sponsor page for editing
router.get('/:id', rejectUnauthenticated, rejectNonAdmin, (req, res) => {

    //returns a specific sponsor's info to reducer
    const query = `SELECT * FROM "sponsor" WHERE id=$1;`;
    pool.query(query, [req.params.id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('Error in specific sponsor GET', error);
            res.sendStatus(500)
        })

});//end one sponsor's info GET route

//adds new sponsor to the DB from admin sponsor page
router.post('/', rejectUnauthenticated, rejectNonAdmin, (req, res) => {

    let sponsor = req.body;

    const query = `INSERT INTO "sponsor" ("name", "logo", "description", "site_link")
        VALUES ($1, $2, $3, $4);`;

    pool.query(query, [sponsor.name, sponsor.logo, sponsor.description, sponsor.site_link])
        .then(result => {
            console.log('new sponsor object POST', result.rows);
            res.sendStatus(201);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500)
        })

});//end add new sponsor POST route

//PUT route to edit a sponsor's information 
router.put('/:id', rejectUnauthenticated, rejectNonAdmin, (req, res) => {

    let sponsor = req.body;

    const query = `UPDATE "sponsor" SET name=$2, logo=$3, description=$4, 
        site_link=$5 WHERE id=$1;`;

    pool.query(query, [req.params.id, sponsor.name, sponsor.logo, sponsor.description,
    sponsor.site_link])
        .then(response => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error updating sponsor in server:', error);
            res.sendStatus(500)
        })

});//end sponsor PUT route

//PUT route to publish a sponsor's information 
router.put('/publish/:id', rejectUnauthenticated, rejectNonAdmin, (req, res) => {

    let sponsor = req.body;

    const query = `UPDATE "sponsor" SET published=$2 WHERE id=$1;`;
    pool.query(query, [req.params.id, sponsor.published])
        .then(response => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('Error updating sponsor publish in server:', error);
            res.sendStatus(500)
        })

});//end sponsor PUT route

//DELETE route to delete a sponsor
router.delete('/:id', rejectUnauthenticated, rejectNonAdmin, (req, res) => {

    const query = `DELETE FROM "sponsor" WHERE id=$1;`;
    pool.query(query, [req.params.id])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('error in delete', error);
            res.sendStatus(500);
        })

});//end sponsor DELETE route

module.exports = router;