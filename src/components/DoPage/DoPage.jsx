import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function DoPage() {
    // const classes = useStyles();
    const list = useSelector((store) => store.seesaydoReducer.doReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('In useEffect param:');
        dispatch({type: 'FETCH_DO'})
    }, []);


    return (
        <div>
            {list[0] === undefined ? 
            ''
            :
            (
            <>
            <h2>To do this task! {list[0].doprompts}</h2>
            <button>Take Picture</button>
            </>
            )
            }

        </div>
    );
}

export default DoPage;