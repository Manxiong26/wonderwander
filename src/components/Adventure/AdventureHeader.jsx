import {
    Typography,
} from "@material-ui/core";
import { useStyles } from "../classes";
import React from "react";


function AdventureHeader({ list }) {
    const classes = useStyles();


    return (
        <>
            <Typography variant="h4" className={classes.title}>
                Adventure
            </Typography>
            <img
                className={classes.bigImage}
                src={list.image}
            /><Typography className={classes.center}>
                {list.title}
            </Typography>
        </>
    );
}

export default AdventureHeader;