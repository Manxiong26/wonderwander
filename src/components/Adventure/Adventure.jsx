import {
    Typography,
    Divider,
    Button,
    ListItemText,
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
        console.log('Adventure Detail item: ', list);
    }, []);

    const { id } = useParams();
    const classes = useStyles();
    return (
        <>
            <div className={classes.pageMargin}>
                <Button
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    <ArrowBackIosIcon />
                </Button>
                <AdventureHeader list={list} />
                <Typography variant="h6" className={classes.redCenter}>
                    Description of the Adventure
                    <Divider />
                </Typography>

                <ListItemText
                    className={classes.center}
                    primary={list.description}
                />
                <Divider />
                <Typography variant="h6" className={classes.redCenter}>
                    See. Do.
                    <Divider />
                </Typography>
                <AdventureSee />
                <AdventureDo />
            </div>
        </>
    );
}

export default Adventure;