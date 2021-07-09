import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

// function to fetch sponsor art from the server
function* fetchSponsorArt(action) {

    // get request to get specific sponsor art from the server
    try {
        const response = yield axios.get(`/api/sponsor-art/${action.payload}`)

        // then sets the reducer to the payload
        yield put({ type: 'SET_SPONSOR_ART', payload: response.data });

        // error if one occurs
    } catch {
        console.log('Error with getting sponsor art');
    }
}

// will run the above function when the below dispatch is received from the clients
function* sponsorArtSaga() {
    yield takeLatest('FETCH_SPONSOR_ART', fetchSponsorArt);
}

export default sponsorArtSaga;