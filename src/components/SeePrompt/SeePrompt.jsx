import React, { useEffect } from 'react';
import { CardContent, Card, IconButton, Typography, CardMedia, makeStyles, } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory, useParams } from "react-router-dom";
import CardActionArea from '@material-ui/core/CardActionArea';
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
  });

function SeePrompt({list}) {
    const classes = useStyles();
    const history = useHistory();
    // const list = useSelector((store) => store.artworkDetailReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('In useEffect param:');
        dispatch({type: 'FETCH_ART_DETAIL', payload: id});
        dispatch({type: 'FETCH_SEE_DETAIL', payload: id});
    }, []);

    const {id} = useParams();


    return (
        // {list && list.name && editMode?}
        <Card>
            <CardContent>
                <CardMedia
                className={classes.cardmedia}
                component="img" 
                image={list.artwork_image}
                >
                </CardMedia>
                <div className={classes.details}>
                    <CardContent>
                        <Typography className={classes.content}>
                            Click here to watch a video about {list.artwork_name}
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