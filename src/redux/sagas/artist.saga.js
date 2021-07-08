import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// GET request for artist detail
// Response sets reducer
function* getArtistDetail(action) {
    try{

        // get request to the server to get the information for a specific artist, using the id from the payload
        const detail = yield axios.get(`/api/artist/${action.payload}`)
        
        // then sets reducer to the response
        yield put({ type: 'SET_ARTIST_DETAIL', payload: detail.data })

    // error if one occurs
    } catch (err) {
        console.log('Error GETting artist detail info in saga.')
    }
}

// will run the above function when the below dispatch is received from the client
function* artistSaga() {
    yield takeLatest('FETCH_ARTIST_DETAIL', getArtistDetail);
}

export default artistSaga;