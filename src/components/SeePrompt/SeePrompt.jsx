import React from 'react';
import { CardContent, Card, IconButton, Typography, CardMedia, makeStyles, } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory } from "react-router-dom";
import CardActionArea from '@material-ui/core/CardActionArea';


const useStyles = makeStyles({
    cardmedia: {
      width: '60px',
      height: '60px',
    },
    content: {
        flex: '1 0 auto',
      },
    details: {
        display: 'flex',
        flexDirection: 'column',
      },
  });

function SeePrompt() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Card>
            <CardContent>
                <CardMedia
                className={classes.cardmedia}
                component="img" 
                image="https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg"
                >

                </CardMedia>
                <div className={classes.details}>
                    <CardContent>
                        <Typography className={classes.content}>
                            Sample Text here
                        </Typography>
                    </CardContent>
                </div>
                <CardActionArea onClick={() => history.push('/see')}>
                    <CardContent>
                        <IconButton>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </CardContent>
                </CardActionArea>
            </CardContent>
        </Card>
    );
}

export default SeePrompt;