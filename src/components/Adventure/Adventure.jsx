import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import AdventureHeader from "./AdventureHeader";


function Adventure() {
    const list = useSelector((store) => store.adventureReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: 'FETCH_ADVENTURE_DETAIL', payload: id})
        console.log('In useEffect param: artwork detail', list);
    }, []);

    const {id} = useParams();

    console.log("hello", list);

    return (
        
        <div>
            <AdventureHeader />
        </div>
    );
}

export default Adventure;