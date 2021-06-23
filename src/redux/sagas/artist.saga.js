import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// GET request for artist detail
// Response sets reducer
function* getArtistDetail(action) {
    try{
        const detail = yield axios.get(`/api/artist/${action.payload}`)
        console.log('Artist Details from server: ', detail.data)
        yield put({ type: 'SET_ARTIST_DETAIL', payload: detail.data })
    } catch (err) {
        console.log('Error GETting artist detail info in saga.')
    }
}


function* artistSaga() {
    yield takeLatest('FETCH_ARTIST_DETAIL', getArtistDetail);
}

export default artistSaga;