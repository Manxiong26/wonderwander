import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchRandomArt(){
    try {
        const response = yield axios.get('/api/random-art');
        console.log(response.data);
        yield put ({type: 'SET_RANDOM_ART', payload: response.data});
    } catch {
        console.log('Error with getting random art');
    }
}

function* randomArtSaga(){
    yield takeLatest('FETCH_RANDOM_ART', fetchRandomArt);
}

export default randomArtSaga;