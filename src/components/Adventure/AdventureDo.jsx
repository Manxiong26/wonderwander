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
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

function AdventureDo() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const doDetail = useSelector((store) => store.adventureSeeDo.doAdventureReducer);
    const { id } = useParams();

    useEffect(() => {
        dispatch({ type: 'FETCH_DO_ADVENTURE', payload: id })
    }, []);

    console.log('in do prompt looking for art detail information', doDetail);


    return (
        <>
            <Grid container direction="column">
                <Grid item xs={12} sm={12} lg={12}>
                    <div className={classes.pageMargin}>
                        <Card className={classes.card}>
                            <CardContent >
                                <CardMedia
                                    className={classes.smallImg}
                                    component="img"
                                    image="http://simpleicon.com/wp-content/uploads/camera.png"
                                >
                                </CardMedia>
                                <div >
                                    <ArrowForwardIosIcon
                                        className={classes.nextBtn}
                                        onClick={(event) => history.push(`/adventure/do/${id}`)} />
                                    {doDetail.map((dolist, i) => {
                                        return (
                                            <CardContent>
                                                <ListItem>
                                                    <ListItemText>
                                                        <Typography className={classes.content} key={i}>
                                                            {dolist.prompts}
                                                        </Typography>
                                                    </ListItemText>
                                                </ListItem>
                                            </CardContent>
                                        )
                                    })}

                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default AdventureDo;