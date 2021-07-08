import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import AdminNav from '../AdminNav/AdminNav'

import {
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
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

  let { id } = useParams();

  const history = useHistory();

  const classes = useStyles();

  const dispatch = useDispatch();

  //redux store instances 
  const quoteList = useSelector((store) => store.adminQuoteListReducer);
  const quoteInfo = useSelector((store) => store.adminQuoteInfoReducer);

  //retrieves quotes' info from DB on page load 
  useEffect(() => {
    dispatch({ type: 'FETCH_QUOTE_LIST' });
  }, []);

  //sets local state for post request
  const [quote, setQuote] = useState('');
  const [quote_by, setQuoteBy] = useState('');

  //edit mode
  const [editMode, setEditMode] = useState(false);

  //Quote post to saga
  const addQuote = () => {

    //create object to send
    const newQuote = {
      quote: quote,
      quote_by: quote_by,
    }

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

    //sets specific quote in quote reducer 
    dispatch({ type: 'SET_QUOTE_INFO', payload: item });

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
      id: quoteInfo.id,
      quote: quote,
      quote_by: quote_by,
    }

    //send updated quote info to quote saga
    dispatch({ type: 'UPDATE_QUOTE_INFO', payload: updatedQuoteInfo });

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

    //dispatch to saga w quote id 
    dispatch({ type: 'DELETE_QUOTE', payload: id })
  }

  //alerts admin to verify artist deletion
  const deleteValidation = (id) => {

    swal({
      title: "Hello!",
      text: "Are you sure you want to PERMANENTLY delete this quote?",
      buttons: {
        cancel: true,
        confirm: "Delete"
      }
    }).then(val => {
      if (val) {
        swal({
          text: "You've deleted this quote.",
        });
        deleteQuote(id);
      }
    });
  }

  //changes db boolean to true which "publishes" item on public facing pages
  const publish = (event, item) => {

    //sets specific adventure in artAdventure reducer
    dispatch({ type: "SET_QUOTE_INFO", payload: item });

    let pubObject;

    if (item.published === true) {
      //changes item boolean to true
      pubObject = {
        id: item.id,
        published: false,
      };
    } else {
      pubObject = {
        id: item.id,
        published: true,
      };
    }

    //sends updated quote boolean (published/unpublished) to quote saga
    dispatch({ type: "UPDATE_PUBLISH_QUOTE", payload: pubObject });
  };

  return (
    <div>
      <AdminNav />
      <Grid container spacing={1} direction="row">
        {editMode ?
          // Edit Quote Form
          <Grid item lg={5} sm={12} xs={12} className={classes.grid}>
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
          //Add Quote Form
          <Grid item lg={5} sm={12} xs={12} className={classes.grid}>
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
        <Grid item lg={7} sm={12} xs={12}>
          <TableContainer
            elevation={6}
            component={Card}
            className={classes.cardTable}
          >
            <div className={classes.tableContent}>
              <Typography className={classes.title} align="center" variant="h4">
                <u>Quote List</u>
              </Typography>
              <Table className={classes.table}>
                <TableBody>
                  {quoteList.map((item, i) => (
                    <TableRow alignItems="flex-start" key={i}>
                      <TableCell>
                        <Typography variant="body1">
                          "{item.quote}" by <b>{item.quote_by}</b>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          control={
                            <Switch
                              size="small"
                              checked={item.published}
                              onChange={(event) => publish(event, item)}
                              name="publish"
                              color="primary"
                            />
                          }
                          labelPlacement="top"
                          label="Publish"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton>
                          <EditIcon
                            className={classes.btn}
                            variant="outlined"
                            onClick={(event) => renderQuoteDetail(event, item)}
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton>
                          <DeleteIcon
                            color="primary"
                            className={classes.btn}
                            variant="outlined"
                            onClick={() => deleteValidation(item.id)}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminQuote;