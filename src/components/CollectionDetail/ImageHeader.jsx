import React from "react";
import { Card, makeStyles, CardMedia, CardContent, Typography,  } from '@material-ui/core';

const useStyles = makeStyles({
    cardmedia: {
        maxWidth: '100%',
    },
})

function ImageHeader() {
    const classes = useStyles();
    return (
        <Card className={classes.cardmedia}>
            <CardMedia
            component="img" 
            image="https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg"
            >
            </CardMedia>
            <CardContent>
                <Typography>
                    Title: MAP THIS
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ImageHeader;

