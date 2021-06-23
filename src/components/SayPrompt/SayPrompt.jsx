import React from 'react';
import { CardContent, Card, IconButton, Typography, CardMedia, makeStyles, CardActionArea, } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { render } from 'react-dom';


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
    card: {
        background: 'red',
    },
  });



function SayPrompt() {
    const classes = useStyles();
    const history = useHistory();
    

    // Currently using red to tell the cards apart at the moment
    return (
        <Card className={classes.card}>
            <CardContent>
                <CardMedia
                className={classes.cardmedia}
                component="img" 
                image="http://cdn.onlinewebfonts.com/svg/img_464398.png"
                >

                </CardMedia>
                <div className={classes.details}>
                    <CardContent>
                        <Typography className={classes.content}>
                            THIS IS THE VOTING PROMPT (SAY)
                        </Typography>
                    </CardContent>
                </div>
                <CardActionArea onClick={() => history.push('/say')}>
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

export default SayPrompt;