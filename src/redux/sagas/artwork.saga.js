import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//function to handle getting the artwork from the server
function* getArtwork() {
    try {

        // get request to the server to get all the artwork from the server
        const response = yield axios.get('/api/artwork');
        
        // then sets the reducer to the response
        yield put({ type: 'SET_ARTWORK', payload: response.data })

    // error if one occurs
    } catch (error) {
        console.log('GET artwork request failed in saga:', error)
    }
}

// will run the above function when the below dispatch is received from the client
function* artworkSaga() {
    yield takeLatest('FETCH_ARTWORK', getArtwork);
}

export default artworkSaga;