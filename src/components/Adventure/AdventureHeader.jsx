import { CardMedia, makeStyles, Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Card } from "@material-ui/core";
import React from "react";
import {useStyles} from '../classes'




function AdventureHeader({list}) {
    const classes = useStyles();


    return (
        <Card className={classes.pageMargin}>
            <CardMedia
            component="img" 
            image={list.image}
            >
            </CardMedia>
            
        </Card>
    );
}

export default AdventureHeader;