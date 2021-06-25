import React, { useEffect, useState } from "react";
import { Card, makeStyles, CardMedia, CardContent, Typography,  } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
    cardmedia: {
        maxWidth: '100%',
    },
})

function ImageHeader({list}) {
    const classes = useStyles();
    // const list = useSelector((store) => store.artworkDetailReducer);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     console.log('In useEffect param:');
    //     dispatch({type: 'FETCH_ART_DETAIL', payload: id})
    // }, []);

    // const {id} = useParams();


    return (
        <Card className={classes.cardmedia}>
            <CardMedia
            component="img" 
            image={list.artwork_image}
            >
            </CardMedia>
            <CardContent>
                <Typography>
                    Title: {list.artwork_name}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ImageHeader;

