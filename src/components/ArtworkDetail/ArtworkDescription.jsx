import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";


function ArtworkDescription() {
    const list = useSelector((store) => store.artworkDetailReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('In useEffect param:');
        dispatch({type: 'FETCH_ART_DETAIL', payload: id})
    }, []);

    const {id} = useParams();

    return (
        <div>
            <Typography>{list.artwork_description}</Typography>
        </div>
    );
}

export default ArtworkDescription;