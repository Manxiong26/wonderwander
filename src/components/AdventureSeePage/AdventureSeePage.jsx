import React, { useEffect } from 'react';
import {
    Typography,
    Button,
} from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
import ReactPlayer from 'react-player';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useStyles } from "../classes";

function AdventureSeePage() {
    const list = useSelector((store) => store.adventureSeeDo.seeAdventureReducer);
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    const classes = useStyles();
    useEffect(() => {
        console.log('In useEffect param:');
        dispatch({ type: 'FETCH_SEE_ADVENTURE', payload: id })
    }, []);


    console.log('TESTING', list);


    return (
        <div className={classes.pageMargin}>
            <Button
                onClick={() => {
                    history.goBack();
                }}
            >
                <ArrowBackIosIcon />
            </Button>
            {list.map((lists, i) => {
                return (
                    <section>
                        <ReactPlayer url={lists.link} controls="true" width="100" />
                        <Typography
                            className={classes.redCenter}
                            key={i} variant="h5">
                            {lists.prompts}
                        </Typography>
                    </section>
                )
            })}
        </div>
    );
}


// artwork_vidlink
export default AdventureSeePage;