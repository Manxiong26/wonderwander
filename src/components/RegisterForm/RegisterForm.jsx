import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Typography, TextField, Card, Grid } from "@material-ui/core";
import { useStyles } from "../classes";

function RegisterForm() {

  // local state for user information, default set to empty but will be set by the input fields when the from is submitted
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");

  // gets the errors from the reducer to be used to display in the case of an error
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  // function to handle registering a user
  const registerUser = (event) => {
    event.preventDefault();

    //sends user information to server to add a user to the database for this app, allowing them to login to the app on a return visit
    dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
        email: email,
        first_name: firstName,
      },
    });
    history.push("/home");
  }; // end registerUser

  return (
    <Card className={classes.loginForm}>

      {/* when the form is submitted, will call the registerUser function with the inputs entered by the user */}
      <form className={classes.form} onSubmit={registerUser}>
        <Typography className={classes.title} variant="h4">
          Register
        </Typography>
        <div className={classes.cardContent}>
          {errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {errors.registrationMessage}
            </h3>
          )}
          <div className={classes.loginInputs}>

            {/* text field for user to input userName */}
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

            {/* text field for user to input password */}
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

            {/* text field for user to input email */}
            <TextField
              className={classes.inputs}
              variant="outlined"
              placeholder="Email"
              label="Email"
              type="email"
              name="email"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
            />

            {/* text field for user to input first name */}
            <TextField
              className={classes.inputs}
              variant="outlined"
              placeholder="First Name"
              label="First Name"
              type="firstName"
              name="firstName"
              value={firstName}
              required
              onChange={(event) => setFirstName(event.target.value)}
            />

            <div className={classes.btn}>

              {/* button to trigger the registration of a user */}
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

export default RegisterForm;
