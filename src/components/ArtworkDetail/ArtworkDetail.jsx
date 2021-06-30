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
import { useHistory } from "react-router-dom";

function CollectionDetail({userLat, userLng, distance}) {
    const list = useSelector((store) => store.artworkDetailReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    const {id} = useParams();

    useEffect(() => {
        dispatch({type: 'FETCH_ART_DETAIL', payload: id})
    }, []);

    console.log('List items: ', list)

    
    
    return (
        <div>
            <button
                onClick={() => {
                    history.goBack();
                }}
            >
                Go back
            </button>
            <ImageHeader list={list}/>
            <ArtworkLinks userLat={userLat} userLng={userLng} list={list} distance={distance}/>
            <Typography>
                See. Say. Do.
            </Typography>
            <SeePrompt/>
            <SayPrompt />
            <DoPrompt />
            <ArtworkDescription />
        </div>
    );
}

export default CollectionDetail;