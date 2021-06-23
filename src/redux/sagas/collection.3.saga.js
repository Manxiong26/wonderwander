import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getThreeCollection() {
    try {
        const response = yield axios.get('/api/collection/city');
        // console.log('Got from server for browser:', response.data)
        yield put({ type: 'SET_THREE_COLLECTION', payload: response.data })
    } catch (error) {
        console.log('GET collection request failed in saga:', error)
    }
}

function* threeCollectionSaga() {
    yield takeLatest('FETCH_THREE_COLLECTION', getThreeCollection);
}

export default threeCollectionSaga;