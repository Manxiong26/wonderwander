import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import AdventureHeader from "./AdventureHeader";
import AdventureSee from "./AdventureSee";
import AdventureDo from "./AdventureDo";
import { useStyles } from '../classes'


function Adventure() {
    const list = useSelector((store) => store.adventureReducer.adventureDetailReducer);
    const dispatch = useDispatch();
    const {id} = useParams();
    const classes = useStyles();


    useEffect(() => {
        dispatch({type: 'FETCH_ADVENTURE', payload: id})
    }, []);

    console.log('In Adventure.jsx. Checking adventure detail ', list);


    

    return (

        <div>
            <AdventureHeader list={list}/>
            <div className={classes.bio}>
            <Typography>
                {list.description}
            </Typography>
            </div>
            <Typography variant="h6" className={classes.title}>
                See Do
            </Typography>
            <AdventureSee />
            <AdventureDo />
            
        </div>
    );
}

export default Adventure;