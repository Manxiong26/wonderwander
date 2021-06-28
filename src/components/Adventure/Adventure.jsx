import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import AdventureHeader from "./AdventureHeader";


function Adventure() {
    const list = useSelector((store) => store.adventureReducer.adventureDetailReducer);
    const dispatch = useDispatch();

    console.log('test1', list);

    useEffect(() => {
        dispatch({type: 'FETCH_ADVENTURE', payload: id})
        console.log('In useEffect param: adventure: ', list);
    }, []);

    const {id} = useParams();

    console.log("test2", list);

    return (

        <div>
            <AdventureHeader list={list}/>
        </div>
    );
}

export default Adventure;