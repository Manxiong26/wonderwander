import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';

// function to get the details for a specific collection from the server
function* getCollectionDetail(action) {

    //get request to the server to get the collection details, using the action.payload as the id
    try {
        const collectionDetail = yield axios.get(`/api/collection/${action.payload}`)

        // then sets the reducer to the response
        yield put({ type: 'SET_COLLECTION_DETAIL', payload: collectionDetail.data })

    // error for if one occurs
    } catch (error) {
        console.log('Error with collection detail request', error);
    }
}

// will run the above function when the below dispatch is received from the client
function* getCollectionDetailSaga() {
    yield takeLatest('FETCH_COLLECTION_DETAIL', getCollectionDetail)
}

export default getCollectionDetailSaga;