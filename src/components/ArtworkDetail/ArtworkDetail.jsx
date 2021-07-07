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

function ArtworkDetail({ userLat, userLng }) {
    const artItem = useSelector((store) => store.artworkDetailReducer);
    const user = useSelector(store => store.user)
    console.log('User: ', user.id)

    const dispatch = useDispatch();
    const history = useHistory();

    // Function to create preview text 
    const truncateString = (str, num) => {
        if (str.length <= num) {
          return str
        }
        return str.slice(0, num) + '...'
      }
      

    useEffect(() => {
        dispatch({ type: 'FETCH_ART_DETAIL', payload: id });
        dispatch({ type: 'FETCH_VIEWED_ART' });
        dispatch({ type: 'CLEAR_SPONSOR_DETAILS' });
        
    }, []);

    console.log('Artwork Detail Item: ', artItem);


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
            <ImageHeader artItem={artItem} />
            <ArtworkDescription artItem={artItem}/>
            <ArtworkLinks userLat={userLat} userLng={userLng} artItem={artItem} />
            <Typography variant="h6" className={classes.redCenter}>
                See. Say. Do.     
            </Typography>
            <Divider />
            <SeePrompt truncateString={truncateString}/>
            <SayPrompt />
            <DoPrompt truncateString={truncateString} />
        </div>
    );
}

export default ArtworkDetail;