import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

// function to get random quote from the server
function* fetchRandomQuote(){

    // get request to the server to get a random quote
    try {
        const response = yield axios.get('/api/random-quote');
    
        // then sets the reducer to the response
        yield put ({type: 'SET_RANDOM_QUOTE', payload: response.data});

    // error when one occurs
    } catch {
        console.log('Error with getting random quote');
    }
}

// will run the above function when the below dispatch is received from the client
function* randomQuoteSaga(){
    yield takeLatest('FETCH_RANDOM_QUOTE', fetchRandomQuote);
}

export default randomQuoteSaga;