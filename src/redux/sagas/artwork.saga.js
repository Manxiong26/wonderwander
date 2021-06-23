import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getArtwork() {
    try {
        const response = yield axios.get('/api/artwork');
        // console.log('Got from server for browser:', response.data)
        yield put({ type: 'SET_ARTWORK', payload: response.data })
    } catch (error) {
        console.log('GET artwork request failed in saga:', error)
    }
}

function* artworkSaga() {
    yield takeLatest('FETCH_ARTWORK', getArtwork);
}

export default artworkSaga;