import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchSponsorDetails(action){
    console.log(action.payload)
    try {
        const response = yield axios.get(`/api/sponsor/${action.payload}`)
        yield put({type: 'SET_SPONSOR_DETAILS', payload: response.data});
    } catch (error) {
        console.log('Error with getting sponsor details from the server', error)
    }
}

function* sponsorDetailsSaga(){
    yield takeLatest('FETCH_SPONSOR_DETAILS', fetchSponsorDetails);
}

export default sponsorDetailsSaga;