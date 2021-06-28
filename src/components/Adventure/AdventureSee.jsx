import { CardActionArea, IconButton, Typography } from "@material-ui/core";
import { CardContent, CardMedia, makeStyles } from "@material-ui/core";
import { Card } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

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

function AdventureSee() {
    const list = useSelector((store) => store.adventureReducer.adventureDetailReducer);
    const seelist = useSelector((store) => store.adventureSeeDo.seeAdventureReducer);
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();


    useEffect(() => {
        console.log('In useEffect param:');
        dispatch({type: 'FETCH_ADVENTURE', payload: id});
        dispatch({type: 'FETCH_SEE_ADVENTURE', payload: id});
    }, []);

    const {id} = useParams();

    return (
        <Card>
            <CardContent>
                <CardMedia 
                 className={classes.cardmedia}
                 component="img" 
                 image={list.image}
                />
                <div className={classes.details}>
                    {seelist.map((seel, i) => {
                        return (
                            <CardContent>
                        <Typography className={classes.content} key={i}>
                            {seel.prompts}
                        </Typography>
                    </CardContent>
                        )
                    })}
                    
                </div>
                <CardActionArea onClick={(event) => history.push(`/adventure/see/${id}`)}>
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

export default AdventureSee;
