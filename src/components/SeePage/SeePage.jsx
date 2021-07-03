import React, { useEffect } from 'react';
import {
    Typography,
    Button,
} from "@material-ui/core";
import { useStyles } from "../classes";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
import ReactPlayer from 'react-player';



function SeePage() {
    const list = useSelector((store) => store.seesaydoReducer.seeReducer);
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        console.log('In useEffect param:');
        dispatch({ type: 'FETCH_SEE_DETAIL', payload: id })
    }, []);


    console.log('TESTING', list);


    return (<>
        <div className={classes.welcomeMargin}>
            <Button
                onClick={() => {
                    history.goBack();
                }}
            >
                <ArrowBackIosIcon />
            </Button>
        </div>
        <div className={classes.welcomeMargin}>
            {list.map((lists, i) => {
                return (
                    <section key={lists.id}>
                        <ReactPlayer
                            url={lists.link} controls="true" width="100" />
                        {/* <img src={lists.image} /> */}
                        <Typography align="center" gutterBottom variant="h5">
                            {lists.prompts}
                        </Typography>
                    </section>
                )
            })}
        </div>
    </>
    );
}


// artwork_vidlink
export default SeePage;