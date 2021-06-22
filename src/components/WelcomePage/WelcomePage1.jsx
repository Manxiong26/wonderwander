import { useEffect } from 'react';
import {useDispatch, useSelector, } from 'react-redux';
import { useHistory } from 'react-router-dom';

function WelcomePage1(){
    const quote = useSelector((store) => store.randomQuote);
    const art = useSelector((store) => store.randomArt);
    console.log(quote);
    console.log(art);
    const history = useHistory();
    const dispatch = useDispatch();
    console.log(quote[0]);

    const goNext = () => {
        history.push('/welcome2');
    }
    const skipWelcome = () => {
        history.push('/home');
    }

    useEffect(() => {
        dispatch({type: 'FETCH_RANDOM_QUOTE'})
    }, [])
    
    useEffect(() => {
        dispatch({type: 'FETCH_RANDOM_ART'})
    }, []);

    return (
        <>
        {quote.quote === undefined ?
        '' : (
            <div>
                <h1>{quote.quote}</h1>
                <img src={art.image}></img>
                <button>Go to login</button>
                <button onClick={goNext}>Next</button>
                <button onClick={skipWelcome}>Skip</button>
            </div>
        )
        }
        </>
    );
}

export default WelcomePage1;