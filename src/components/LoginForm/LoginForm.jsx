import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Button, Typography, TextField, Card, Grid} from '@material-ui/core'
import { useStyles } from '../classes';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const user = useSelector(store => store.user)
  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
    
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
      <div>
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
        
      </div>
      <div>
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
      </div>
      <div>
        <Button color="primary" variant="outlined" className={classes.formBtn} type="submit" name="submit">Log In</Button>
      </div>
      </div>
    </form>
    </Card>
  );
}

export default LoginForm;
