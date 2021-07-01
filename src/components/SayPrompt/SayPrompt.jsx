import React, { useEffect } from 'react';
import {
    Grid,
    ListItem,
    ListItemText,
    CardContent,
    Card,
    Typography,
    CardMedia,
} from "@material-ui/core";
import { useStyles } from "../classes";
import { useHistory, useParams } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { render } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

function SayPrompt() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const list = useSelector((store) => store.seesaydoReducer.sayReducer);

    useEffect(() => {
        console.log('in useEffect param: SayPrompt');
        dispatch({ type: 'FETCH_SAY_DETAIL', payload: id });
    }, []);

    const { id } = useParams();


    // Currently using red to tell the cards apart at the moment
    return (
        <>
            <Grid container direction="column">
                <Grid item xs={12} sm={12} lg={12}>
                    <div className={classes.pageMargin}>
                        <Card className={classes.card}>
                            <CardContent>
                                <CardMedia
                                    className={classes.smallImg}
                                    component="img"
                                    image="http://cdn.onlinewebfonts.com/svg/img_464398.png"
                                >
                                </CardMedia>
                                <div >
                                    <ArrowForwardIosIcon
                                        onClick={() => history.push(`/say/${id}`)}
                                        className={classes.nextBtn} />
                                    <CardContent>
                                        <ListItem>
                                            <ListItemText>
                                                <Typography >
                                                    What did you think of this piece? Vote!
                                                </Typography>
                                            </ListItemText>
                                        </ListItem>
                                    </CardContent>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default SayPrompt;