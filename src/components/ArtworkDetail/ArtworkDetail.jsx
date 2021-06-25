import React, { useEffect } from "react";
import ImageHeader from "./ImageHeader";
import ArtworkLinks from "./ArtworkLinks";
import { Typography } from "@material-ui/core";
import SeePrompt from "../SeePrompt/SeePrompt";
import SayPrompt from "../SayPrompt/SayPrompt";
import DoPrompt from "../DoPrompt/DoPrompt";
import ArtworkDescription from "./ArtworkDescription";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


function CollectionDetail() {
    const list = useSelector((store) => store.artworkDetailReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'FETCH_ART_DETAIL', payload: id})
        console.log('In useEffect param: artwork detail', list);
    }, []);

    const {id} = useParams();
    
    return (
        <div>
            <ImageHeader list={list}/>
            <ArtworkLinks list={list}/>
            <Typography>
                See. Say. Do.
            </Typography>
            <SeePrompt list={list} id={id}/>
            <SayPrompt />
            <DoPrompt list={list}/>
            <ArtworkDescription />
        </div>
    );
}

export default CollectionDetail;