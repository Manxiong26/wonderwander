import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: fired on "FETCH_ARTWORK_LIST" actions dispatched from loading artwork list on page mount
function* getArtworkList() {
  try {
    const artworks = yield axios.get('/api/admin/artwork');
    yield put({ type: 'SET_ARTWORK', payload: artworks.data });
  } catch (error) {
    console.log('Artwork List get request failed', error);
  }
}

function* getArtwork(action) {
  try {
    const artwork = yield axios.get(`/api/admin/artwork/${action.payload}`);
    yield put({ type: 'SET_ARTWORK_INFO', payload: artwork.data[0] });
  } catch (error) {
    console.log('Artwork get request failed: ', error);
  }
}

function* addArtwork(action) {
  try {
    yield axios.post('/api/admin/artwork', action.payload);
    yield put({ type: 'FETCH_ARTWORK_LIST' });
  } catch (error) {
    console.log('Error adding new artwork: ', error);
  }
}

function* updateArtwork(action) {
  try {
    yield axios.put(`/api/admin/artwork/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_ARTWORK_LIST' });
    yield put({ type: 'CLEAR_ARTWORK' });
  } catch (error) {
    alert(`Sorry things aren't working at the moment. Please try again later.`);
    console.log('Error updating artwork info: ', error);
  }
}

function* updatePublish(action) {
  try {
    yield axios.put(`/api/admin/artwork/publish/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_ARTWORK_LIST' });
    yield put({ type: 'CLEAR_ARTWORK' });
  } catch (error) {
    console.log('Error updating publish: ', error);
  }
}

function* deleteArtwork(action) {
  try {
    yield axios.delete(`/api/admin/artwork/${action.payload}`);
    yield put({ type: 'FETCH_ARTWORK_LIST' });
  } catch (error) {
    console.log('Error deleting artwork: ', error);
  }
}

function* getSeeList(action) {
  try {
    const sees = yield axios.get(`/api/admin/artwork/${action.payload}/see`);
    yield put({ type: 'SET_SEE_ARTWORK', payload: sees.data });
  } catch (error) {
    console.log('Artwork SEE List get request failed', error);
  }
}

function* getSee(action) {
  try {
    const see = yield axios.get(`/api/admin/artwork/see/${action.payload}`);
    yield put({ type: 'SET_SEE_INFO_ARTWORK', payload: see.data[0] });
  } catch (error) {
    console.log('Artwork SEE get request failed: ', error);
  }
}

function* addSee(action) {
  try {
    yield axios.post('/api/admin/artwork/see', action.payload);
    yield put({ type: 'FETCH_SEE_LIST_ARTWORK' });
  } catch (error) {
    console.log(`Error adding 'See' to artwork: `, error);
  }
}

function* updatePublishSee(action) {
  try{
    yield axios.put(`/api/admin/artwork/see/publish/${action.payload.id}`, action.payload); 
    yield put({type: 'FETCH_SEE_LIST_ARTWORK', payload: action.payload.artwork_id }); 
    yield put({type: 'CLEAR_SEE_ARTWORK'});
  } catch (error) {
    console.log('Error updating see publish: ', error);
  }
}

function* deleteSee(action) {
  try{
      yield axios.delete(`/api/admin/artwork/see/${action.payload.id}`); 
      yield put({type: 'FETCH_SEE_LIST_ARTWORK', payload: action.payload.artwork_id}); 
  } catch (error) {
    console.log('Error deleting see: ', error);
  }
}

function* getDoList(action) {
  try {
    const dos = yield axios.get(`/api/admin/artwork/${action.payload}/do`);
    yield put({ type: 'SET_DO_ARTWORK', payload: dos.data });
  } catch (error) {
    console.log('Artwork DO List get request failed', error);
  }
}

function* getDo(action) {
  try {
    const doo = yield axios.get(`/api/admin/artwork/do/${action.payload}`);
    yield put({ type: 'SET_DO_INFO_ARTWORK', payload: doo.data[0] });
  } catch (error) {
    console.log('Artwork DO get request failed: ', error);
  }
}

function* addDo(action) {
  try {
    yield axios.post('/api/admin/artwork/do', action.payload);
    yield put({ type: 'FETCH_DO_LIST_ARTWORK' });
  } catch (error) {
    console.log(`Error adding 'Do' to adventure: `, error);
  }
}

function* updatePublishDo(action) {
  try{
    yield axios.put(`/api/admin/artwork/do/publish/${action.payload.id}`, action.payload); 
    yield put({type: 'FETCH_DO_LIST_ARTWORK', payload: action.payload.artwork_id}); 
    yield put({type: 'CLEAR_DO_ARTWORK'});
  } catch (error) {
    console.log('Error updating Do publish: ', error);
  }
}

function* deleteDo(action) {
  try{
      yield axios.delete(`/api/admin/artwork/do/${action.payload.id}`); 
      yield put({type: 'FETCH_DO_LIST_ARTWORK', payload: action.payload.artwork_id}); 
  } catch (error) {
    console.log('Error deleting do: ', error);
  }
}

function* adminArtworkSaga() {
  yield takeEvery('FETCH_ARTWORK_LIST', getArtworkList);
  yield takeEvery('FETCH_ARTWORK', getArtwork);
  yield takeEvery('ADD_ARTWORK', addArtwork);
  yield takeEvery('UPDATE_ARTWORK_INFO', updateArtwork);
  yield takeEvery('UPDATE_PUBLISH_ARTWORK', updatePublish);
  yield takeEvery('DELETE_ARTWORK', deleteArtwork);
  yield takeEvery('FETCH_SEE_LIST_ARTWORK', getSeeList);
  yield takeEvery('FETCH_SEE_ARTWORK', getSee);
  yield takeEvery('ADD_SEE_ARTWORK', addSee);
  yield takeEvery('UPDATE_PUBLISH_SEE_ARTWORK', updatePublishSee);
  yield takeEvery('DELETE_SEE_ARTWORK', deleteSee);
  yield takeEvery('FETCH_DO_LIST_ARTWORK', getDoList);
  yield takeEvery('FETCH_DO_ARTWORK', getDo);
  yield takeEvery('ADD_DO_ARTWORK', addDo);
  yield takeEvery('UPDATE_PUBLISH_DO_ARTWORK', updatePublishDo);
  yield takeEvery('DELETE_DO_ARTWORK', deleteDo);
}

export default adminArtworkSaga;