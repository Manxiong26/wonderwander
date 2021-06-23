import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getCollection() {
    try {
        const response = yield axios.get('/api/collection');
        // console.log('Got from server for browser:', response.data)
        yield put({ type: 'SET_COLLECTION', payload: response.data })
    } catch (error) {
        console.log('GET collection request failed in saga:', error)
    }
}

function* collectionSaga() {
    yield takeLatest('FETCH_COLLECTION', getCollection);
}

export default collectionSaga;