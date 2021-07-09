import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Button, Typography, TextField, Card, Grid} from '@material-ui/core'
import { useStyles } from '../classes';

function LoginForm() {

  // local state for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //gets the errors from the store to display if an error logging in occurs 
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  // gets user information from the store if a user is logged in
  const user = useSelector(store => store.user)

  // handles logging into the app
  const login = (event) => {
    event.preventDefault();

    //if both fields are filled, will make dispatch to server which logs in the users
    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });

    // else make a dispatch to get the error from the store and display it
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }

    //successful login pushes to home page
    history.push('/home')
    
  }; // end login

  return (
    <Card className={classes.loginForm}>
    <form className={classes.form} onSubmit={login}>
      <Typography className={classes.title} variant="h4">Login</Typography>
      <div className={classes.cardContent}>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div className={classes.loginInputs}>

          {/* when the button to log in is clicked, will take the value in this field for the dispatch */}
          <TextField
            className={classes.inputs}
            variant="outlined"
            placeholder="Username"
            label="Username"
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        
          {/* when the button to log in is clicked, will take the value in this field for the dispatch */}
          <TextField
            className={classes.inputs}
            variant="outlined"
            placeholder="Password"
            label="Password"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
      
      <div className={classes.btn}>

        {/* button that when clicked, begins login process */}
        <Button  color="primary" variant="outlined" type="submit" name="submit">Log In</Button>
      </div>
      </div>
      </div>
    </form>
    </Card>
  );
}

export default LoginForm;
