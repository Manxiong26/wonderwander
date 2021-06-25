import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects'; 

// worker Saga: fired on "FETCH_SPONSOR_LIST" actions dispatched from loading sponsor list on page mount
function* getSponsorList() {
  try {
    const sponsors = yield axios.get('/api/admin/sponsor'); 
    console.log('get all sponsors:', sponsors.data);
    yield put({ type: 'SET_SPONSOR', payload: sponsors.data });
  } catch (error) {
    console.log('Sponsor List get request failed', error);
  }
}

function* getSponsor(action) {
  try {
    const sponsor = yield axios.get(`/api/admin/sponsor/${action.payload}`); 
    console.log('get one specific sponsor:', sponsor.data[0]);
    yield put({ type: 'SET_SPONSOR_INFO', payload: sponsor.data[0] });
    
  } catch (error) {
    console.log('Sponsor get request failed: ', error);
  }
}

function* addSponsor(action) {
    try {
        console.log('New sponsor:', action.payload);
        yield axios.post('/api/admin/sponsor', action.payload); 
        yield put({type: 'FETCH_SPONSOR_LIST' }); 
    } catch (error) {
        console.log('Error adding new sponsor: ', error);
    }
}

function* updateSponsor(action) {
    console.log('in edit saga', action.payload);
    try{
        yield axios.put(`/api/admin/sponsor/${action.payload.id}`, action.payload); 
        yield put({type: 'FETCH_SPONSOR_LIST'}); 
        yield put({type: 'CLEAR_SPONSOR'});
      } catch (error) {
        alert(`Sorry things aren't working at the moment. Please try again later.`);
        console.log('Error updating sponsor info: ', error);
    }
}

function* deleteSponsor(action) {
    try{
        yield axios.delete(`/api/admin/sponsor/${action.payload}`); 
        yield put({type: 'FETCH_SPONSOR_LIST'}); 
    } catch (error) {
        console.log('Error deleting sponsor: ', error);
    }
}

function* adminSponsorSaga() {
  yield takeEvery('FETCH_SPONSOR_LIST', getSponsorList);
  yield takeEvery('FETCH_SPONSOR', getSponsor);
  yield takeEvery('ADD_SPONSOR', addSponsor);
  yield takeEvery('UPDATE_SPONSOR_INFO', updateSponsor); 
  yield takeEvery('DELETE_SPONSOR', deleteSponsor);
}

export default adminSponsorSaga;