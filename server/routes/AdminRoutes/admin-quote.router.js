const express = require('express');
const {
  rejectUnauthenticated,
} = require('../../modules/authentication-middleware');
const pool = require('../../modules/pool');
const router = express.Router();

//gets all quotes' info from DB to display on admin quote page as li's
router.get('/',  (req, res) => {  //rejectUnauthenticated,

    //returns all quote info to reducer
    const query = `SELECT * FROM "quotes" ORDER BY "quote_by" ASC;`;
    pool.query(query)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error quote GET', error);
        res.sendStatus(500)
    })

});//end quote GET route

//gets one specific quote's info from DB to display on admin quote page for editing
router.get('/:id',  (req, res) => {  //rejectUnauthenticated,
    console.log(`in one quote's info get, id:`, req.params.id);
    
    //returns a specific quotes's info to reducer
    const query = `SELECT * FROM "quotes" WHERE id=$1;`;
    pool.query(query, [req.params.id])
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error in specific quote GET', error);
        res.sendStatus(500)
    })
  
});//end one quote's info GET route

//adds new quote to the DB from admin quote page
router.post('/',  (req, res) => {  //rejectUnauthenticated,

    let quote = req.body;
    
    const query  = `INSERT INTO "quotes" ("quote", "quote_by")
        VALUES ($1, $2);`;
    pool.query(query, [quote.quote, quote.quote_by])
    .then(result => {
        console.log('new quote object POST', result.rows);
        res.sendStatus(201);
    }).catch (error => {
        console.log(error);
        res.sendStatus(500)
    })
  
});//end add new quote POST route

//PUT route to edit a quote's information 
router.put('/:id',  (req, res) => { //rejectUnauthenticated,
    console.log('put id:', req.params.id);
    console.log('put update body:', req.body);

    let quote = req.body;
    
    const query = `UPDATE "quotes" SET quote=$2, quote_by=$3 WHERE id=$1;`;
    pool.query(query, [req.params.id, quote.quote, quote.quote_by])
    .then(response => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('Error updating quote in server:', error);
        res.sendStatus(500)
    })
  
});//end quote PUT route
  
//DELETE route to delete a quote
router.delete('/:id',  (req, res) => { //rejectUnauthenticated,
  
    const query = `DELETE FROM "quotes" WHERE id=$1;`;
    pool.query(query, [req.params.id]) 
    .then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error in delete', error);
        res.sendStatus(500);
    })
  
});//end quoute DELETE route

module.exports = router;