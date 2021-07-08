import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// function to get the vote number from the server
function* voteNumber(action) {

    // get request to get the vote count from the server for a specific piece of artwork
    try {
        const response = yield axios.get(`/api/say/count/${action.payload.artwork_id}`);
       
        // then sets the reducer to the response
        yield put({ type: 'SET_TOTAL_VOTE', payload: response.data })

    // error if one occurs
    } catch (error) {
        console.log('GET voteNumber request failed in saga:', error)
    }
}

// will run the above function when the below dispatch is received from the client
function* totalVoteSaga() {
    yield takeLatest('FETCH_TOTAL_VOTE', voteNumber);
}

export default totalVoteSaga;