import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// function to get three collections from the server
function* getThreeCollection() {
    try {

        // get request to get collection information for three collections from the server
        const response = yield axios.get('/api/collection/city');
        
        // then sets the reducer to the response
        yield put({ type: 'SET_THREE_COLLECTION', payload: response.data })

    // error if one occurs
    } catch (error) {
        console.log('GET collection request failed in saga:', error)
    }
}

// will run the above function when the below dispatch is received from the client
function* threeCollectionSaga() {
    yield takeLatest('FETCH_THREE_COLLECTION', getThreeCollection);
}

export default threeCollectionSaga;