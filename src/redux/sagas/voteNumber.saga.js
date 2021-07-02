import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* voteNumber(action) {
    try {
        const response = yield axios.get(`/api/say/count/${action.payload.artwork_id}`);
        console.log('in voteNumber', response.data);
        yield put({ type: 'SET_TOTAL_VOTE', payload: response.data })
    } catch (error) {
        console.log('GET voteNumber request failed in saga:', error)
    }
}

function* totalVoteSaga() {
    yield takeLatest('FETCH_TOTAL_VOTE', voteNumber);
}

export default totalVoteSaga;