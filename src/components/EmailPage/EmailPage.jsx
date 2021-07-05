import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Mailchimp from "react-mailchimp-form";
import {Button} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useStyles } from '../classes';

function EmailPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");


  const history = useHistory();
  const classes = useStyles();

  const back = () => {
    history.push("/home");
  };

  return (
    <div className={classes.pageMargin}>
      <Button
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowBackIosIcon />
      </Button>

      {/* <form>
            <input onChange={(event) => setEmail(event.target.value)} value={email} placeholder="Email"></input>
            <input onChange={(event) => setName(event.target.value)} value={name} placeholder="Name"></input>
            <button>Sign up</button>
        </form>*/}
    </div>
  );
}

export default EmailPage;
