import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getCollection() {
    try {

        // server get request to get the collections from the server
        const response = yield axios.get('/api/collection');

        // then sets reducer to the response
        yield put({ type: 'SET_COLLECTION', payload: response.data })

        // error if one occurs
    } catch (error) {
        console.log('GET collection request failed in saga:', error)
    }
}

// will run the above function when the below dispatch is received from the client
function* collectionSaga() {
    yield takeLatest('FETCH_COLLECTION', getCollection);
}

export default collectionSaga;