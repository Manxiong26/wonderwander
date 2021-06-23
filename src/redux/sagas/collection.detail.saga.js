import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';

function* getCollectionDetail(action) {
    console.log('fetching collection detail by id', action.payload);
    try {
        const collectionDetail = yield axios.get(`/api/collection/${action.payload}`)
        yield put({ type: 'SET_COLLECTION_DETAIL', payload: collectionDetail.data })
    } catch (error) {
        console.log('Error with collection detail request', error);
    }
}

function* getCollectionDetailSaga() {
    yield takeLatest('FETCH_COLLECTION_DETAIL', getCollectionDetail)
}

export default getCollectionDetailSaga;