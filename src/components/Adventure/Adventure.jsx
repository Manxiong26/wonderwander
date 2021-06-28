import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import AdventureHeader from "./AdventureHeader";


function Adventure() {
    const list = useSelector((store) => store.adventureReducer.adventureDetailReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'FETCH_ADVENTURE', payload: id})
        console.log('In useEffect param: artwork detail', list);
    }, []);

    const {id} = useParams();

    console.log("hello", list);

    return (

        <div>
            <AdventureHeader list={list}/>
        </div>
    );
}

export default Adventure;