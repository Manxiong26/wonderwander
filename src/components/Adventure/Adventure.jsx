import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import AdventureHeader from "./AdventureHeader";
import AdventureSee from "./AdventureSee";
import AdventureDo from "./AdventureDo";


function Adventure() {
    const {id} = useParams();
    const list = useSelector((store) => store.adventureReducer.adventureDetailReducer);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch({type: 'FETCH_ADVENTURE', payload: id})
        console.log('In useEffect param: adventure: ', list);
    }, []);

    

    return (

        <div>
            <AdventureHeader list={list}/>
            <Typography>SEE. DO.</Typography>
            <AdventureSee />
            <AdventureDo />
            <Typography>
                {list.description}
            </Typography>
        </div>
    );
}

export default Adventure;