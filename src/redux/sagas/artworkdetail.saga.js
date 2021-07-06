import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchArtDetail(action){
    try {
        let id = action.payload;
        const response = yield axios.get(`/api/artworkdetail/${id}`);
        yield put ({type: 'SET_ART_DETAIL', payload: response.data});
        console.log('Artwork Detail Saga Response: ', response.data);
    } catch {
        console.log('Error with getting Artwork detail');
    }
}

function* fetchViewed(){
    try {
        const response = yield axios.get(`/api/viewed`);
        yield put ({type: 'SET_VIEWED_ART', payload: response.data});
        console.log('Artwork Seen: ', response.data);
    } catch {
        console.log('Error with getting Viewed Art detail');
    }
}

function* artDetailSaga(){
    yield takeLatest('FETCH_ART_DETAIL', fetchArtDetail);
    yield takeLatest('FETCH_VIEWED_ART', fetchViewed);
}

export default artDetailSaga;