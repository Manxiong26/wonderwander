import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function AdventureDoPage() {
    // const classes = useStyles();
    const list = useSelector((store) => store.adventureSeeDo.doAdventureReducer);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        console.log('In useEffect param:');
        dispatch({type: 'FETCH_DO_ADVENTURE', payload: id})
    }, []);


    return (
        <div>
            {list.map((lists, i) => {
                return (
                <h2 key={i}>To do this task! {lists.prompts}</h2>    
                )
            })}
            
            <button>Take Picture</button>
        </div>
    );
}

export default AdventureDoPage;