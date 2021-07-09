import {
    Typography,
} from "@material-ui/core";
import { useStyles } from "../classes";
import React from "react";


function AdventureHeader({ advDetail }) {

    // classes constant from classes.js import for styling 
    const classes = useStyles();

    //to render the header for the adventure page
    return (
        <>
            <Typography variant="h4" className={classes.title}>
                Adventure
            </Typography>
            <img
                className={classes.image}
                src={advDetail.image}
            /><Typography className={classes.center}>
                <b>{advDetail.title}</b>
            </Typography>
        </>
    );
}

// for exporting to adventure
export default AdventureHeader;