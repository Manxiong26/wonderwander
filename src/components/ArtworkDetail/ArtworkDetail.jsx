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
    Grid,
    Button,
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
        <Grid container direction="column">
            <Grid item xs={12} sm={12} lg={12}>
                <div className={classes.pageMargin}>
                    <Button
                        onClick={() => {
                            history.goBack();
                        }}
                    >
                        <ArrowBackIosIcon />
                    </Button>
                    <ImageHeader list={list} />
                    <ArtworkLinks userLat={userLat} userLng={userLng} list={list} />
                    <h2 className={classes.red}>
                        See. Say. Do.
                    </h2>
                    <SeePrompt />
                    <SayPrompt />
                    <DoPrompt />
                    <ArtworkDescription />
                </div>
            </Grid>
        </Grid>
    );
}

export default CollectionDetail;