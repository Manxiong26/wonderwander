import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useStyles } from '../classes'


function ArtworkDescription() {
    const list = useSelector((store) => store.artworkDetailReducer);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        console.log('In useEffect param:');
        dispatch({type: 'FETCH_ART_DETAIL', payload: id})
    }, []);

    const {id} = useParams();

    return (
        <div className={classes.bio}>
            <Typography variant="body1">{list.artwork_description}</Typography>
        </div>
    );
}

export default ArtworkDescription;