import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchRandomQuote(){
    try {
        const response = yield axios.get('/api/random-quote');
        console.log(response.data);
        yield put ({type: 'SET_RANDOM_QUOTE', payload: response.data});
    } catch {
        console.log('Error with getting random quote');
    }
}

function* randomQuoteSaga(){
    yield takeLatest('FETCH_RANDOM_QUOTE', fetchRandomQuote);
}

export default randomQuoteSaga;