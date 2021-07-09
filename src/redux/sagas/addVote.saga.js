import axios from 'axios';
import { put, takeLatest } from "redux-saga/effects";

// function that handles user votes from the server
function* AddVote(action) {
    try {

        //will make post request to server to add a new vote to a piece of artwork
        yield axios.post('/api/say/', action.payload);

        // then will fetch the total votes from the server
        yield put({ type: 'FETCH_TOTAL_VOTE', payload: action.payload });

        // error if one occurs
    } catch (error) {
        console.log('Failed to add new vote', error);
    }
}

// will run the above function when the below dispatch is received from the client
function* addVoteSaga() {
    yield takeLatest('ADDING_NEW_VOTE', AddVote);
}

export default addVoteSaga;