import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {useStyles} from '../classes'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
    Button,
    Typography,
    TextField,
    FormGroup,
    FormControlLabel,
  } from "@material-ui/core";

function EmailPage(){

    // sets local state for email, firstName, and lastName to be defaulted as empty
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    // for styling the page
    const classes = useStyles();

    // object with the info entered into the text fields
    const emailInfo = {
        email: email,
        firstName: firstName,
        lastName: lastName,
    }

    // when this function is called, dispatches to the server to store that object above in the database
    const storeInfo = () => {
        dispatch({type: 'STORE_INFO', payload: emailInfo});

        // clear inputs after
        clearInputs();
    }

    // function to clear inputs
    const clearInputs = () => {
        setEmail('');
        setFirstName('');
        setLastName('');
    }

    // to render to the DOM
    return (
        <>
            {/* button that when clicked, takes user back to previous page */}
            <Button className={classes.pageMargin} onClick={() => {
                history.goBack();
            }}>
                <ArrowBackIosIcon />
            </Button>

            {/* form that handles the inputs from the user */}
            <form className={classes.center}>

                {/* when button is clicked, changes local state to the value that the user input into each text field  */}
                <TextField onChange={(event) => setEmail(event.target.value)} value={email} placeholder="Email"></TextField>
                <TextField onChange={(event) => setFirstName(event.target.value)} value={firstName} placeholder="First Name"></TextField>
                <TextField onChange={(event) => setLastName(event.target.value)} value={lastName} placeholder="Last Name"></TextField>

                {/* button to call the storeInfo function and send the data to the server */}
                <Button color="secondary" variant="contained" onClick={storeInfo}>Sign up</Button>
            </form>
        </>
    )
}

export default EmailPage;
