import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

// function to get specific art details
function* fetchArtDetail(action) {
    try {
        let id = action.payload;

        // get request to the server to get the specific artwork detail from the server
        const response = yield axios.get(`/api/artworkdetail/${id}`);

        // then sets the reducer to response
        yield put({ type: 'SET_ART_DETAIL', payload: response.data });

        // error if one occurs
    } catch {
        console.log('Error with getting Artwork detail');
    }
}

// function to fetch the viewed art
function* fetchViewed() {
    try {

        // get request to the server to get the viewed art
        const response = yield axios.get(`/api/viewed`);

        // then sets reducer to the response
        yield put({ type: 'SET_VIEWED_ART', payload: response.data });

        // error if one occurs
    } catch {
        console.log('Error with getting Viewed Art detail');
    }
}

// will run the above functions when the below dispatches are received from the client
function* artDetailSaga() {
    yield takeLatest('FETCH_ART_DETAIL', fetchArtDetail);
    yield takeLatest('FETCH_VIEWED_ART', fetchViewed);
}

export default artDetailSaga;