import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography, Divider, ListItemText } from "@material-ui/core";
import { useStyles } from "../classes";

function ArtworkDescription({ artItem }) {
  // const list = useSelector((store) => store.artworkDetailReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("In useEffect param:");
    dispatch({ type: "FETCH_ART_DETAIL", payload: id });
  }, []);

  const { id } = useParams();
  const classes = useStyles();
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
