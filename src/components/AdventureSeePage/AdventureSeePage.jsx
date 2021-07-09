import React, { useEffect } from 'react';
import {
    Card,
    Grid,
    Typography,
    IconButton,
    Avatar,
    Button,
    Divider,
} from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
import ReactPlayer from 'react-player';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useStyles } from "../classes";

function AdventureSeePage() {

    //gets the see for the adventure from the store
    const seeList = useSelector((store) => store.adventureSeeDo.seeAdventureReducer);
    const dispatch = useDispatch();

    //for getting the id for this see page for that adventure
    const { id } = useParams();
    const history = useHistory();
    const classes = useStyles();

    //on page load, use that id as the payload to dispatch to the server and fetch the see details for that adventure
    useEffect(() => {
        console.log('In useEffect param:');
        dispatch({ type: 'FETCH_SEE_ADVENTURE', payload: id })
    }, []);

    //for rendering this page 
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
            <Grid container direction="column">
                <Grid item xs={12} sm={12} lg={12}>
                    <div className={classes.pageMargin}>
                        <Typography variant="h5" className={classes.title}>
                            See
                        </Typography>

                        {/* map through the see for this adventure and displays it to the DOM */}
                        {seeList.map((item, i) => {
                            return (
                                <Card >
                                    <div key={i} className={classes.cardContent}>
                                        <ReactPlayer url={item.link} controls="true" width="75%" height="100%" className={classes.reactPlayer} />
                                        <Typography
                                            align="center" variant="body1" className={classes.caption}>
                                            {item.prompts}
                                        </Typography>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}


// for exporting the page
export default AdventureSeePage;