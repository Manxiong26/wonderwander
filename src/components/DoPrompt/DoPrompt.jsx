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
    card: {
        margin: '5px',
    },
  });

function DoPrompt() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const doDetail = useSelector((store) => store.seesaydoReducer.doReducer);
    const {id} = useParams();

    useEffect(() => {
        dispatch({type: 'FETCH_DO', payload: id})
    }, []);

    console.log('in do prompt looking for art detail information', doDetail);

       
    return (
        <div>
            {doDetail.map((dolist, i) => {
                        return (
        <Card className={classes.card}>
            <CardContent >
                <CardMedia
                className={classes.cardmedia}
                component="img" 
                image={dolist.image}
                >
                </CardMedia>
                <div className={classes.details}>
                    
                            <CardContent>
                        <Typography className={classes.content} key={i}>
                            {dolist.prompts}
                        </Typography>
                    </CardContent>
                </div>
                <CardActionArea onClick={(event) => history.push(`/do/${id}`)}>
                    <CardContent>
                        <IconButton>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </CardContent>
                </CardActionArea>
            </CardContent>
        </Card>
           )
        })}
        </div>
    );
}

export default DoPrompt;