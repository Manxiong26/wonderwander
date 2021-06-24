import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchSponsorArt(action){
    console.log(action.payload);
    try {
        const response = yield axios.get(`/api/sponsor-art/${action.payload}`)
        yield put({type: 'SET_SPONSOR_ART', payload: response.data});
    } catch {
        console.log('Error with getting sponsor art');
    }
}

function* sponsorArtSaga(){
    yield takeLatest('FETCH_SPONSOR_ART', fetchSponsorArt);
}

export default sponsorArtSaga;