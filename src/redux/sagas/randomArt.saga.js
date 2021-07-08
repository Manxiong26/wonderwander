import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

// function to get random art from teh server
function* fetchRandomArt(){

    // get request to get random art to the server
    try {
        const response = yield axios.get('/api/random-art');

        // then sets reducer to the response
        yield put ({type: 'SET_RANDOM_ART', payload: response.data});

    // error if one occurs
    } catch {
        console.log('Error with getting random art');
    }
}

// will run the above function when the below dispatch is received from the client
function* randomArtSaga(){
    yield takeLatest('FETCH_RANDOM_ART', fetchRandomArt);
}

export default randomArtSaga;