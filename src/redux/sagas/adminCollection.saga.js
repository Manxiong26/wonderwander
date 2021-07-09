import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: fired on "FETCH_COLLECTION_LIST" actions dispatched from loading collection list on page mount
function* getCollectionList() {
  try {
    const collections = yield axios.get('/api/admin/collection');
    yield put({ type: 'SET_COLLECTION', payload: collections.data });
  } catch (error) {
    console.log('Collection List get request failed', error);
  }
}

function* getCollection(action) {
  try {
    const collection = yield axios.get(`/api/admin/collection/${action.payload}`);
    yield put({ type: 'SET_COLLECTION_INFO', payload: collection.data[0] });
  } catch (error) {
    console.log('Collection get request failed: ', error);
  }
}

function* addCollection(action) {
  try {
    yield axios.post('/api/admin/collection', action.payload);
    yield put({ type: 'FETCH_COLLECTION_LIST' });
  } catch (error) {
    console.log('Error adding new collection: ', error);
  }
}

function* updateCollection(action) {
  try {
    yield axios.put(`/api/admin/collection/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_COLLECTION_LIST' });
    yield put({ type: 'CLEAR_COLLECTION' });
  } catch (error) {
    alert(`Sorry things aren't working at the moment. Please try again later.`);
    console.log('Error updating collection info: ', error);
  }
}

function* updatePublish(action) {
  try {
    yield axios.put(`/api/admin/collection/publish/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_COLLECTION_LIST' });
    yield put({ type: 'CLEAR_COLLECTION' });
  } catch (error) {
    console.log('Error updating publish in collection saga: ', error);
  }
}

function* deleteCollection(action) {
  try {
    yield axios.delete(`/api/admin/collection/${action.payload}`);
    yield put({ type: 'FETCH_COLLECTION_LIST' });
  } catch (error) {
    console.log('Error deleting collection: ', error);
  }
}

function* adminCollectionSaga() {
  yield takeEvery('FETCH_COLLECTION_LIST', getCollectionList);
  yield takeEvery('FETCH_COLLECTION', getCollection);
  yield takeEvery('ADD_COLLECTION', addCollection);
  yield takeEvery('UPDATE_COLLECTION_INFO', updateCollection);
  yield takeEvery('UPDATE_PUBLISH_COLLECTION', updatePublish)
  yield takeEvery('DELETE_COLLECTION', deleteCollection);
}

export default adminCollectionSaga;