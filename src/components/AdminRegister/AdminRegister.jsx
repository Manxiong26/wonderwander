import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, TextField, Card, Grid } from "@material-ui/core";
import { useStyles } from "../classes";

function AdminRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const classes = useStyles();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER_ADMIN',
      payload: {
        username: username,
        password: password,
        email: email,
        first_name: name,

      },
    });

    setUsername('');
    setPassword('');
    setEmail('');
    setName('');

    swal({
      text: "Successfully created a new administrator",
      icon: "success",
    });

  }; // end registerUser

  return (
    <Card className={classes.loginForm}>
      <form className={classes.form} onSubmit={registerUser}>
        <Typography className={classes.title} variant="h4">
          Add Admin
        </Typography>
        <div className={classes.cardContent}>
          {errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {errors.registrationMessage}
            </h3>
          )}
          <div className={classes.loginInputs}>
            <TextField
              className={classes.inputs}
              variant="outlined"
              placeholder="Username"
              label="Username"
              type="text"
              name="username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              className={classes.inputs}
              variant="outlined"
              placeholder="Password"
              label="Password"
              type="password"
              name="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              className={classes.inputs}
              variant="outlined"
              placeholder="Email"
              label="Email"
              type="text"
              name="email"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              className={classes.inputs}
              variant="outlined"
              placeholder="First Name"
              label="First Name"
              type="text"
              name="name"
              value={name}
              required
              onChange={(event) => setName(event.target.value)}
            />
            <div className={classes.btn}>
              <Button
                color="primary"
                variant="outlined"
                type="submit"
                name="submit"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Card>
  );
}

export default AdminRegister;