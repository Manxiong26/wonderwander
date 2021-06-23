import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchArtdetail(action){
    try {
        let id = action.payload;
        const response = yield axios.get(`/api/artworkdetail/${id}`);
        yield put ({type: 'SET_ART_DETAIL', payload: response.data});
        console.log('error in fetchArtdetail under yield put', response.data);
    } catch {
        console.log('Error with getting Artwork detail');
    }
}

function* artDetailSaga(){
    yield takeLatest('FETCH_ART_DETAIL', fetchArtdetail);
}

export default artDetailSaga;