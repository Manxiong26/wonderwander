import { CardMedia, makeStyles, Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Card } from "@material-ui/core";
import React from "react";


const useStyles = makeStyles({
    cardmedia: {
        maxWidth: '100%',
    },
})

function AdventureHeader({list}) {
    const classes = useStyles();


    return (
        <Card className={classes.cardmedia}>
            <CardMedia
            component="img" 
            image={list.image}
            >
            </CardMedia>
            <CardContent>
                <Typography>
                    Activity: {list.title}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default AdventureHeader;