import React, { useEffect } from 'react';
import {
    Grid,
    ListItem,
    ListItemText,
    Divider,
    CardContent,
    Card,
    Typography,
    CardMedia,
} from "@material-ui/core";
import { useStyles } from "../classes";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';


function SeePrompt() {
    const classes = useStyles();
    const history = useHistory();
    const list = useSelector((store) => store.artworkDetailReducer);
    const seelist = useSelector((store) => store.seesaydoReducer.seeReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('In useEffect param:');
        dispatch({ type: 'FETCH_ART_DETAIL', payload: id });
        dispatch({ type: 'FETCH_SEE_DETAIL', payload: id });
    }, []);

    const { id } = useParams();


    console.log('IN SEE PROMPT', seelist);

    return (
        // {list && list.name && editMode?}
        <>
            <Divider />
            <Grid container direction="column">
                <Grid item xs={12} sm={12} lg={12}>
                    <div className={classes.pageMargin}>
                        {seelist.map((seel, i) => {
                            return (
                                <Card className={classes.card}>
                                    <CardContent>
                                        <CardMedia
                                            className={classes.smallImg}
                                            component="img"
                                            image={seel.link}
                                        />
                                        <div>
                                            <ArrowForwardIosIcon
                                                className={classes.nextBtn}
                                                onClick={(event) => history.push(`/see/${id}`)} />
                                            <CardContent>
                                                <ListItem>
                                                    <ListItemText>
                                                        <Typography className={classes.content} key={seel.id}>
                                                            {seel.prompts}
                                                        </Typography>
                                                    </ListItemText>
                                                </ListItem>
                                            </CardContent>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default SeePrompt;