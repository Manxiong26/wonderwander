import {
    Typography,
    Divider,
    Button,
    ListItemText,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import AdventureHeader from "./AdventureHeader";
import AdventureSee from "./AdventureSee";
import AdventureDo from "./AdventureDo";
import { useHistory } from "react-router-dom";
import { useStyles } from "../classes";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function Adventure() {

    //variable to bring in the adventure detail from the adventureReducer for a specific adventure
    const advDetail = useSelector((store) => store.adventureReducer.adventureDetailReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    //to get id for specific adventure
    const { id } = useParams();

    //variable set to classes.js file for styling
    const classes = useStyles();

    // Function to create preview of prompt
    const truncateString = (str, num) => {
        if (str.length <= num) {
            return str
        }
        return str.slice(0, num) + '...'
    }


    //on page load, dispatch for getting adventure detail from server with the payload of that id from useParams
    useEffect(() => {
        dispatch({ type: 'FETCH_ADVENTURE_DETAIL', payload: id })
    }, []);

    //to render adventure detail page
    return (
        <>
            <div className={classes.pageMargin}>

                {/* button to take user back to previous page */}
                <Button
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    <ArrowBackIosIcon />
                </Button>
                <AdventureHeader advDetail={advDetail} />
                <Typography variant="h6" className={classes.redCenter}>
                    Adventure Description
                    <Divider />
                </Typography>
                <div className={classes.textBox}>
                    <ListItemText
                        className={classes.center}
                        primary={advDetail.description}
                    />
                </div>
                <Divider />
                <Typography variant="h6" className={classes.redCenter}>
                    See. Do.
                    <Divider />
                </Typography>

                {/* components for the see and do part of the adventure, with the truncateString function passed as a prop */}
                <AdventureSee truncateString={truncateString} />
                <AdventureDo truncateString={truncateString} />
            </div>
        </>
    );
}

// for exporting this component to App
export default Adventure;