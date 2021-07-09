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

    // grabs the art item from the store
    const artItem = useSelector((store) => store.artworkDetailReducer);

    //gets the user information from the store, this is for handling the rendering of the button for marking a piece of art as seen
    const user = useSelector(store => store.user)
    console.log('User: ', user.id)

    const dispatch = useDispatch();
    const history = useHistory();

    //to get the specific id for the art
    const { id } = useParams();
    const classes = useStyles();
    
    // Function to create preview text 
    const truncateString = (str, num) => {
        if (str.length <= num) {
          return str
        }
        return str.slice(0, num) + '...'
      }
      

    // on page load, runs these dispatches to the server
    useEffect(() => {
        dispatch({ type: 'FETCH_ART_DETAIL', payload: id });
        dispatch({ type: 'FETCH_VIEWED_ART' });
        dispatch({ type: 'CLEAR_SPONSOR_DETAILS' });
        
    }, []);

    //for rendering the page to the DOM
    return (
         
        // button that when clicked, goes back to the previous page 
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