import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

// function to get the details for a sponsor from the server
function* fetchSponsorDetails(action){
    
    // get request to the server
    try {
        const response = yield axios.get(`/api/sponsor/${action.payload}`)

        // then sets the reducer to the response
        yield put({type: 'SET_SPONSOR_DETAILS', payload: response.data});

    // error if one occurs
    } catch (error) {
        console.log('Error with getting sponsor details from the server', error)
    }
}

// will run the above function when the below dispatch is received from the client
function* sponsorDetailsSaga(){
    yield takeLatest('FETCH_SPONSOR_DETAILS', fetchSponsorDetails);
}

export default sponsorDetailsSaga;