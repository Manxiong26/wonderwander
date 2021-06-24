import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects'; 

// worker Saga: fired on "FETCH_ARTIST_LIST" actions dispatched from loading artist list on page mount
function* getArtistList() {
  try {
    const artists = yield axios.get('/api/admin/artist'); 
    console.log('get all artists:', artists.data);
    yield put({ type: 'SET_ARTIST', payload: artists.data });
  } catch (error) {
    console.log('Artist List get request failed', error);
  }
}

function* getArtist(action) {
  try {
    const artist = yield axios.get(`/api/admin/artist/${action.payload}`); 
    console.log('get one specific artist:', artist.data[0]);
    yield put({ type: 'SET_ARTIST_INFO', payload: artist.data[0] });
    
  } catch (error) {
    console.log('Artist get request failed: ', error);
  }
}

function* addArtist(action) {
    try {
        console.log('New artist:', action.payload);
        yield axios.post('/api/admin/artist', action.payload); 
        yield put({type: 'FETCH_ARTIST_LIST' }); 
    } catch (error) {
        console.log('Error adding new artist: ', error);
    }
}

function* updateArtist(action) {
    console.log('in edit saga', action.payload);
    try{
        yield axios.put(`/api/admin/artist/${action.payload.id}`, action.payload); 
        yield put({type: 'FETCH_ARTIST_LIST'}); // payload: action.payload.id does this payload need to be here?
        yield put({type: 'CLEAR_ARTIST'});
      } catch (error) {
        alert(`Sorry things aren't working at the moment. Please try again later.`);
        console.log('Error updating artist info: ', error);
    }
}

function* deleteArtist(action) {
    try{
        yield axios.delete(`/api/admin/artist/${action.payload}`); 
        yield put({type: 'FETCH_ARTIST_LIST'}); 
    } catch (error) {
        console.log('Error deleting artist: ', error);
    }
}

function* adminArtistSaga() {
  yield takeEvery('FETCH_ARTIST_LIST', getArtistList);
  yield takeEvery('FETCH_ARTIST', getArtist);
  yield takeEvery('ADD_ARTIST', addArtist);
  yield takeEvery('UPDATE_ARTIST_INFO', updateArtist); 
  yield takeEvery('DELETE_ARTIST', deleteArtist);
}

export default adminArtistSaga;

