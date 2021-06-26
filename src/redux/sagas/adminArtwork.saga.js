import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects'; 

// worker Saga: fired on "FETCH_ARTWORK_LIST" actions dispatched from loading artwork list on page mount
function* getArtworkList() {
  try {
    const artworks = yield axios.get('/api/admin/artwork'); 
    console.log('get all artworks:', artworks.data);
    yield put({ type: 'SET_ARTWORK', payload: artworks.data });
  } catch (error) {
    console.log('Artwork List get request failed', error);
  }
}

function* getArtwork(action) {
  try {
    const artwork = yield axios.get(`/api/admin/artwork/${action.payload}`); 
    console.log('get one specific artwork:', artwork.data[0]);
    yield put({ type: 'SET_ARTWORK_INFO', payload: artwork.data[0] });
    
  } catch (error) {
    console.log('Artwork get request failed: ', error);
  }
}

function* addArtwork(action) {
    try {
        console.log('New artwork:', action.payload);
        yield axios.post('/api/admin/artwork', action.payload); 
        yield put({type: 'FETCH_ARTWORK_LIST' }); 
    } catch (error) {
        console.log('Error adding new artwork: ', error);
    }
}

function* updateArtwork(action) {
    console.log('in edit saga', action.payload);
    try{
        yield axios.put(`/api/admin/artwork/${action.payload.id}`, action.payload); 
        yield put({type: 'FETCH_ARTWORK_LIST'}); 
        yield put({type: 'CLEAR_ARTWORK'});
      } catch (error) {
        alert(`Sorry things aren't working at the moment. Please try again later.`);
        console.log('Error updating artwork info: ', error);
    }
}

function* deleteArtwork(action) {
    try{
        yield axios.delete(`/api/admin/artwork/${action.payload}`); 
        yield put({type: 'FETCH_ARTWORK_LIST'}); 
    } catch (error) {
        console.log('Error deleting artwork: ', error);
    }
}

function* adminArtworkSaga() {
  yield takeEvery('FETCH_ARTWORK_LIST', getArtworkList);
  yield takeEvery('FETCH_ARTWORK', getArtwork);
  yield takeEvery('ADD_ARTWORK', addArtwork);
  yield takeEvery('UPDATE_ARTWORK_INFO', updateArtwork); 
  yield takeEvery('DELETE_ARTWORK', deleteArtwork);
}

export default adminArtworkSaga;