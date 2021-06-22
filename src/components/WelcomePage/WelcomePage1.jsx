import { useEffect } from 'react';
import {useDispatch, useSelector, } from 'react-redux';
import { useHistory } from 'react-router-dom';

function WelcomePage1(){
    const quotes = useSelector((store) => store.quote);
    const art = useSelector((store) => store.art);
    const history = useHistory();
    const dispatch = useDispatch();

    const goNext = () => {
        history.push(`/welcome2`);
    }

    useEffect(() => {
        dispatch({type: 'FETCH_QUOTES'})
    }, [])
    
    useEffect(() => {
        dispatch({type: 'FETCH_ART'})
    }, []);

    return (
        <div>
            <h1>Random Quote Here</h1>
            <h1>Random Art here</h1>
            <button>Go to login</button>
            <button>Next</button>
        </div>
    )


}

export default WelcomePage1;