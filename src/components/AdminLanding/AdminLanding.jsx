import React, { useState } from 'react';
import AdminNav from '../AdminNav/AdminNav'
import { useHistory } from 'react-router-dom';
import { Card, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useStyles } from '../classes'

function AdminLanding() {
  const history = useHistory();
  const classes = useStyles()
  const user = useSelector(store => store.user)

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <>
    <AdminNav />
    <Card className={classes.cardForm} >
        <Typography align="center" variant="h5">
            Welcome, {user.first_name}
        </Typography>
    </Card>
    </>
  );
}

export default AdminLanding;