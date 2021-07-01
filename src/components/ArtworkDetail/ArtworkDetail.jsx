import React, { useEffect } from "react";
import ImageHeader from "./ImageHeader";
import ArtworkLinks from "./ArtworkLinks";
import { Typography, Button } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SeePrompt from "../SeePrompt/SeePrompt";
import SayPrompt from "../SayPrompt/SayPrompt";
import DoPrompt from "../DoPrompt/DoPrompt";
import ArtworkDescription from "./ArtworkDescription";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useStyles } from '../classes'

function CollectionDetail({userLat, userLng}) {
    const list = useSelector((store) => store.artworkDetailReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        dispatch({type: 'FETCH_ART_DETAIL', payload: id})
        console.log('In useEffect param: artwork detail', list);
    }, []);

    const {id} = useParams();
    
    return (
        <div>
            <Button
                onClick={() => {
                    history.goBack();
                }}
            >
                <ArrowBackIosIcon />
            </Button>
            <ImageHeader list={list}/>
            <div style={{marginTop: '2%'}}>
            <ArtworkDescription />
            </div>
            <ArtworkLinks userLat={userLat} userLng={userLng} list={list}/>
            <Typography variant="h6" className={classes.title}>
                See Say Do
            </Typography>
            <SeePrompt/>
            <SayPrompt />
            <DoPrompt />
            
        </div>
    );
}

export default CollectionDetail;