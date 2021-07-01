import {
    Typography,
    Divider,
    Button,
    ListItemText,
    Grid
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import AdventureHeader from "./AdventureHeader";
import AdventureSee from "./AdventureSee";
import AdventureDo from "./AdventureDo";
import { useHistory } from "react-router-dom";
import { useStyles } from "../classes";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function Adventure() {
    const list = useSelector((store) => store.adventureReducer.adventureDetailReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_ADVENTURE', payload: id })
        console.log('In useEffect param: adventure: ', list);
    }, []);

    const { id } = useParams();
    const classes = useStyles();
    return (
        <>
            <Button
                onClick={() => {
                    history.goBack();
                }}
            >
                <ArrowBackIosIcon />
            </Button>
            <Grid container direction="column">
                <Grid item xs={12} sm={12} lg={12}>
                    <div className={classes.pageMargin}>
                        <AdventureHeader list={list} />
                        <h2 className={classes.red}>
                            See. Do.
                        </h2>
                        <Divider />
                        <AdventureSee />
                        <AdventureDo />
                        <Typography variant="h6" className={classes.red}>
                            Description of the Adventure
                        </Typography>
                        <Divider />
                        <ListItemText
                        className={classes.center}
                            primary={list.description}
                        />
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default Adventure;