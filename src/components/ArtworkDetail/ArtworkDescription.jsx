import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography, Divider, ListItemText } from "@material-ui/core";
import { useStyles } from "../classes";

function ArtworkDescription({ artItem }) {

  const dispatch = useDispatch();

  //on page load, fetches the art detail from the server using the id as a payload 
  useEffect(() => {
    console.log("In useEffect param:");
    dispatch({ type: "FETCH_ART_DETAIL", payload: id });
  }, []);

  // to get the id for the specific piece of artwork
  const { id } = useParams();
  const classes = useStyles();

  // for rendering to the DOM
  return (
    <>
      {artItem.description && (
        <>
          <Typography variant="h6" className={classes.redCenter}>
            Art Description
          </Typography>
          <Divider />
          <div className={classes.textBox}>
            <Typography variant="body1">{artItem.description}</Typography>
          </div>
        </>
      )}
      <Divider />
    </>
  );
}

export default ArtworkDescription;
