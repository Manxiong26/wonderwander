import {
    Typography,
} from "@material-ui/core";
import { useStyles } from "../classes";
import React from "react";


function AdventureHeader({ advDetail }) {
    const classes = useStyles();

    console.log('In AdventureHeader..Checking adventure detail: ', advDetail)


    return (
        <>
            <Typography variant="h4" className={classes.title}>
                Adventure
            </Typography>
            <img
                className={classes.bigImage}
                src={advDetail.image}
            /><Typography className={classes.center}>
                <b>{advDetail.title}</b>
            </Typography>
        </>
    );
}

export default AdventureHeader;