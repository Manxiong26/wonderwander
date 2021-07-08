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
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const emailInfo = {
        email: email,
        firstName: firstName,
        lastName: lastName,
    }

    const storeInfo = () => {
        dispatch({type: 'STORE_INFO', payload: emailInfo});
        clearInputs();
    }

    const clearInputs = () => {
        setEmail('');
        setFirstName('');
        setLastName('');
    }

    return (
        <>
            <Button className={classes.pageMargin} onClick={() => {
                history.goBack();
            }}>
                <ArrowBackIosIcon />
            </Button>
            <form className={classes.center}>
                <TextField onChange={(event) => setEmail(event.target.value)} value={email} placeholder="Email"></TextField>
                <TextField onChange={(event) => setFirstName(event.target.value)} value={firstName} placeholder="First Name"></TextField>
                <TextField onChange={(event) => setLastName(event.target.value)} value={lastName} placeholder="Last Name"></TextField>
                <Button color="secondary" variant="contained" onClick={storeInfo}>Sign up</Button>
            </form>
            
        </>
    )
}

export default EmailPage;
