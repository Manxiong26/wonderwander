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
      <LoginForm />

      <center>
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
