import React, { useEffect } from 'react';
import { CardContent, Card, IconButton, Typography, CardMedia, makeStyles, } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from "prop-types";
import ReactPlayer from 'react-player';
import { useStyles } from '../classes'



function SeePage() {
    const list = useSelector((store) => store.seesaydoReducer.seeReducer);
    const dispatch = useDispatch();
    const {id} = useParams();
    const classes = useStyles();
    
    
    useEffect(() => {
        console.log('In useEffect param:');
        dispatch({type: 'FETCH_SEE_DETAIL', payload: id})
    }, []);

    
console.log('TESTING', list);


    return (
        <div className={classes.pageMargin}>
            {list.map((lists, i) => {
                return (
                    <section key={lists.id}>
                    
                            <div className={classes.thumbnail}>
                            <ReactPlayer url={lists.link} controls="true" width="75" />
                            </div>
                            <div >
                            <img className={classes.image} src={lists.image} />
                            </div>
                    <div className={classes.bio}>
                    <Typography  align="center" gutterBottom variant="body1">
                        {lists.prompts}
                    </Typography>
                    </div>
                </section>
                )
            })}
        </div>
    );
}


// artwork_vidlink
export default SeePage;