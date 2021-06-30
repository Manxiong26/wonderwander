import axios from 'axios';
import { put, takeLatest } from "redux-saga/effects";

function* AddVote(action) {
    try {
        console.log('yesssss', action.payload);
        yield axios.post('/api/say/', action.payload);
        yield put({ type: 'SET_VOTE'});
    } catch (error) {
        console.log('Failed to add new vote', error);
    }
}

function* addVoteSaga() {
    yield takeLatest('ADDING_NEW_VOTE', AddVote);
}

export default addVoteSaga;