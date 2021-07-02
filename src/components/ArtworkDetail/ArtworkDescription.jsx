import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography, Grid, Divider, ListItemText } from "@material-ui/core";
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
        <Grid container direction="column">
            <Grid item xs={12} sm={12} lg={12}>
                <div className={classes.pageMargin}>
                    {/* <Typography variant="h6" className={classes.redCenter}>
                        Description of the Art Work
                    </Typography> */}
                    <Divider />
                    <ListItemText
                    className={classes.center}
                        primary={list.artwork_description}
                    />
                </div>
            </Grid>
        </Grid>
        </>
    );
}

export default ArtworkDescription;