import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography, Divider, ListItemText } from "@material-ui/core";
import { useStyles } from "../classes";

function ArtworkDescription() {
    const list = useSelector((store) => store.artworkDetailReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('In useEffect param:');
        dispatch({ type: 'FETCH_ART_DETAIL', payload: id })
    }, []);

    const { id } = useParams();
    const classes = useStyles();
    return (
        <>
            <Typography variant="h6" className={classes.redCenter}>
                Description of the Art Work<Divider />
            </Typography>
            <ListItemText
                className={classes.center}
                primary={list.artwork_description}
            />
            <Divider />
        </>
    );
}

export default ArtworkDescription;