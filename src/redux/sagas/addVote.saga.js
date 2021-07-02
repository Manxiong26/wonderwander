import axios from 'axios';
import { put, takeLatest } from "redux-saga/effects";

function* AddVote(action) {
    try {
        console.log('Before SET_VOTE', action.payload);
        yield axios.post('/api/say/', action.payload);
        // console.log('Middle SET_VOTE', action.payload);
        yield put({ type: 'FETCH_TOTAL_VOTE', payload: action.payload});
        // console.log('after SET_VOTE', action.payload);
    } catch (error) {
        console.log('Failed to add new vote', error);
    }
}

function* addVoteSaga() {
    yield takeLatest('ADDING_NEW_VOTE', AddVote);
}

export default addVoteSaga;