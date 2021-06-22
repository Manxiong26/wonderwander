import { useEffect } from 'react';
import {useDispatch, useSelector, } from 'react-redux';
import { useHistory } from 'react-router-dom';

function WelcomePage1(){
    const quote = useSelector((store) => store.randomQuote);
    const art = useSelector((store) => store.randomArt);
    const history = useHistory();
    const dispatch = useDispatch();

    const goNext = () => {
        history.push('/welcome2');
    }

    useEffect(() => {
        dispatch({type: 'FETCH_RANDOM_QUOTE'})
    }, [])
    
    useEffect(() => {
        dispatch({type: 'FETCH_RANDOM_ART'})
    }, []);

    return (
        <div>
            <h1>Random Quote Here</h1>
            <h1>Random Art here</h1>
            <button>Go to login</button>
            <button onClick={goNext}>Next</button>
        </div>
    )


}

export default WelcomePage1;