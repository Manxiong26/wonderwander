import React, { useEffect } from "react";
import ImageHeader from "./ImageHeader";
import ArtworkLinks from "./ArtworkLinks";
import SeePrompt from "../SeePrompt/SeePrompt";
import SayPrompt from "../SayPrompt/SayPrompt";
import DoPrompt from "../DoPrompt/DoPrompt";
import ArtworkDescription from "./ArtworkDescription";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

//material UI
import {
    Button,
    Typography,
    Divider,
} from "@material-ui/core";
import { useStyles } from "../classes";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function CollectionDetail({ userLat, userLng }) {
    const list = useSelector((store) => store.artworkDetailReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_ART_DETAIL', payload: id })
        console.log('In useEffect param: artwork detail', list);
    }, []);

    const { id } = useParams();
    const classes = useStyles();
    return (
        <div className={classes.pageMargin}>
            <Button
                onClick={() => {
                    history.goBack();
                }}
            >
                <ArrowBackIosIcon />
            </Button>
            <ImageHeader list={list} />
            <ArtworkDescription />
            <ArtworkLinks userLat={userLat} userLng={userLng} list={list} />
            <Typography variant="h6" className={classes.redCenter}>
                See. Say. Do.
                <Divider />
            </Typography>
            <SeePrompt />
            <SayPrompt />
            <DoPrompt />
        </div>
    );
}

export default CollectionDetail;