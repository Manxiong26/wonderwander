import React, { useEffect } from 'react';
import { CardContent, Card, IconButton, Typography, CardMedia, makeStyles, CardActionArea, } from "@material-ui/core";
import { useHistory, useParams } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { render } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';


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
    const dispatch = useDispatch();
    const list = useSelector((store) => store.seesaydoReducer.sayReducer);
    
    useEffect(() => {
        console.log('in useEffect param: SayPrompt');
        dispatch({type: 'FETCH_SAY_DETAIL', payload: id});
    }, []);

    const {id} = useParams();
    

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
                            What did you think of this piece? Vote!
                        </Typography>
                    </CardContent>
                </div>
                <CardActionArea onClick={() => history.push(`/say/${id}`)}>
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