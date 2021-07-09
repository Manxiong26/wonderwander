import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { useStyles } from '../classes'
import { Button } from '@material-ui/core'

function LoginPage() {
  const history = useHistory();
  const classes = useStyles()

  return (
    <div>

      {/* login form component */}
      <LoginForm />
      <center>

        {/* button that when clicked, takes user to registration page to create an account */}
        <Button
          type="button"
          className={classes.btn}
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </Button>
      </center>
    </div>
  );
}

export default LoginPage;
