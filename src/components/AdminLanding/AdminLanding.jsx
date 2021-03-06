import React, { useState } from "react";
import AdminNav from "../AdminNav/AdminNav";
import { useHistory } from "react-router-dom";
import { Card, Typography, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useStyles } from "../classes";

function AdminLanding() {
  const history = useHistory();
  const classes = useStyles();
  const user = useSelector((store) => store.user);

  const onLogin = (event) => {
    history.push("/login");
  };

  const toAdminRegister = () => {
    history.push("/admin/register");
  };

  return (
    <>
      <AdminNav />
      <Card className={classes.loginForm}>
        <div className={classes.cardContent}>
          <Typography className={classes.title} align="center" variant="h5">
            Welcome, {user.first_name}
          </Typography>
          <Typography className={classes.tableContent} variant="body1">
            As an administrator of this site you have unique capabilities. Some
            features include:
          </Typography>
          <ul>
            <li>Navigation based on the category links above</li>
            <li>The ability to add, edit, and delete information</li>
            <li>
              The option to 'publish' an item to display it on the app, or to
              put it in 'draft' mode which will not be publicly viewable
            </li>
            <li>
              The ability to add new administrators using the 'ADD ADMIN' button below.
            </li>
          </ul>
          <div style={{ display: "flex" }}>
            <Button
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "20%",
              }}
              variant="outlined"
              color="primary"
              onClick={toAdminRegister}
            >
              Add Admin
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}

export default AdminLanding;
