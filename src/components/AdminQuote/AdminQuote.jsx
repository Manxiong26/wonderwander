import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useHistory, useParams } from 'react-router-dom';
import AdminNav from '../AdminNav/AdminNav'

import {
    Button,
    Typography,
    TextField,
    Grid,
    Card,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    List,
    ListItem,
    Box,
    Divider,
  } from "@material-ui/core";
  import DeleteIcon from "@material-ui/icons/Delete";
  import EditIcon from "@material-ui/icons/Edit";
  
  import { useStyles } from "../classes";
  
function AdminQuote() {

    let {id} = useParams();
    //console.log(id);

    //functionality to route to a page
    const history = useHistory();

    const classes = useStyles();

    //functionality to dispatch information to a saga or reducer
    const dispatch = useDispatch();

    //redux store instances 
    const quoteList = useSelector((store) => store.adminQuoteListReducer);
    const quoteInfo = useSelector((store) => store.adminQuoteInfoReducer);
    console.log('quote reducer id:', quoteInfo.id);

    //retrieves quotes' info from DB
    useEffect(() => {
        dispatch({ type: 'FETCH_QUOTE_LIST' });
    }, []);

    //sets local state for post request
    const [quote, setQuote] = useState('');
    const [quote_by, setQuoteBy] = useState('');

    //edit mode
    const [editMode, setEditMode] = useState(false);

    //post to saga
    const addQuote = () => {
        
        //create object to send
        const newQuote = {
            quote: quote,
            quote_by: quote_by, 
        }
        console.log('posting new object: ', newQuote);
        
        //dispatch to quoteList saga
        dispatch({ type: 'ADD_QUOTE', payload: newQuote });
        
        //alert successful post
        swal({
            text: "This quote has been added to your list!",
            icon: "success"
        });

        //updates quote list on DOM
        dispatch({ type: 'FETCH_QUOTE_LIST' });

        //clears input fields
        setQuote('');
        setQuoteBy('');
    }

    //renders specific quote's details in input feilds to edit
    const renderQuoteDetail = (event, item) => {
        console.log('clicking edit for Quote = ', item);

        //sets specific quote in quote reducer 
        dispatch({type: 'SET_QUOTE_INFO', payload: item}); // 

        //renders form view from add to edit mode
        setEditMode(true);
 
        //shows specific artist's details in input fields for editing
        setQuote(item.quote);
        setQuoteBy(item.quote_by);
    }

    //update (edit) quote information
    const updateQuoteInfo = () => {
        
        //create updated quote object
        const updatedQuoteInfo = {
            id: quoteInfo.id, //doublecheck if this is quote or quoteInfo
            quote: quote,
            quote_by: quote_by,
        }

        console.log('updated quote info:', updatedQuoteInfo);

        //send updated quote info to quote saga
        dispatch({type: 'UPDATE_QUOTE_INFO', payload: updatedQuoteInfo});

        //swal success indicator
        swal({
            text: "This quote's information has been updated!",
            icon: "success" 
        });

        //turn editMode off
        setEditMode(false);

        //clears input fields
        setQuote('');
        setQuoteBy('');
    }

    //cancel (editMode) button - returns to add quote form
    const renderToInfo = () => {
        setEditMode(false);

        //clears input fields
        setQuote('');
        setQuoteBy('');
    }

    //delete quote 
    const deleteQuote = (id) => {
        console.log('deleting quote:', id);
        
        //dispatch to saga w quote id 
        dispatch({type: 'DELETE_QUOTE', payload: id})
    }

    //alerts admin to verify artist deletion
    const deleteValidation = (id) => {
        console.log('delete clicked! id = ', id);

        swal({
            title: "Hello!",
            text: "Are you sure you want to PERMANENTLY delete this quote?",
            buttons: {
              cancel: true,
              confirm: "Delete"
            }
        }).then(val => {
          if(val) {
            swal({
              text: "You've deleted this quote.",
            });
            deleteQuote(id);
          }
        });
    }
  
    return (
      <div>
          <AdminNav />
          <Grid container spacing={1} direction="row">
          {editMode ?
          <Grid item lg={5} className={classes.grid}>
          <Card elevation={6} className={classes.cardForm}>
            <div className={classes.cardContent}>
              <Typography className={classes.title} align="center" variant="h4">Edit Quote</Typography>
              <form className={classes.form} onSubmit={updateQuoteInfo}>
                <TextField type="text"
                className={classes.inputs}
                variant="outlined"
                    placeholder="Quote"
                    label="Quote"
                    value={quote}
                    onChange={(event) => setQuote(event.target.value)}
                />
                <TextField type="text"
                className={classes.inputs}
                variant="outlined"
                    placeholder="Author"
                    label="Author"
                    value={quote_by}
                    onChange={(event) => setQuoteBy(event.target.value)}
                />
                <Button className={classes.formBtn} type="submit" name="submit" variant="outlined" value="Update">Update</Button>
                <Button className={classes.formBtn} variant="outlined" onClick={renderToInfo}>Cancel</Button>
              </form>
          </div>
          </Card>
          </Grid>
          :    
          <Grid item lg={5} className={classes.grid}>
          <Card elevation={6} className={classes.cardForm}>
            <div className={classes.cardContent}>
              <Typography className={classes.title} align="center" variant="h4">Add Quote</Typography>
              <form className={classes.form} onSubmit={addQuote}>
                <TextField type="text"
                className={classes.inputs}
                variant="outlined"
                    placeholder="Quote"
                    label="Quote"
                    value={quote}
                    onChange={(event) => setQuote(event.target.value)}
                />
                <TextField type="text"
                className={classes.inputs}
                variant="outlined"
                    placeholder="Author"
                    label="Author"
                    value={quote_by}
                    onChange={(event) => setQuoteBy(event.target.value)}
                />
                <Button className={classes.formBtn} type="submit" name="submit" variant="outlined" value="Submit">Submit</Button>
              </form>
          </div>
          </Card>
          </Grid>}
          
          {/* Quote List. Always shows. */}
          {/* Edit clickability renders a specific quote's details in the edit form */}
          <Grid item lg={7}>
              <Card elevation={6}
          
                className={classes.cardTable}>
                <div className={classes.tableContent}>
              <Typography className={classes.title} align="center" variant="h4">Quote List</Typography>
            <List className={classes.table}>
                {quoteList.map((item, i) =>
                    <div>
                    <ListItem key={i} > 
                        <Typography variant="body1">
                            "{item.quote}" by <b>{item.quote_by}</b>
                        </Typography>
                      <IconButton align="right">
                        <EditIcon
                          className={classes.btn}
                          variant="outlined"
                          onClick={(event) => renderQuoteDetail(event, item)}
                        />
                      </IconButton>
                      <IconButton align="right">
                        <DeleteIcon
                          color="primary"
                          className={classes.btn}
                          variant="outlined"
                          onClick={() => deleteValidation(item.id)}
                        />
                      </IconButton>
                    </ListItem>
                    <Divider/>
                   </div>
                )}
            </List>
          </div>
          </Card>
          </Grid>
                </Grid>
      </div>
    );
}

export default AdminQuote;