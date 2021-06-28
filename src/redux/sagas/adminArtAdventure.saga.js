import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects'; 

// worker Saga: fired on "FETCH_ADVENTURE_LIST" actions dispatched from loading art adventure list on page mount
function* getArtAdventureList() {
  try {
    const adventures = yield axios.get('/api/admin/art-adventure'); 
    console.log('get all adventures:', adventures.data);
    yield put({ type: 'SET_ADVENTURE', payload: adventures.data });
  } catch (error) {
    console.log('Art adventure List get request failed', error);
  }
}

function* getArtAdventure(action) {
  try {
    const adventure = yield axios.get(`/api/admin/art-adventure/${action.payload}`); 
    console.log('get one specific adventure:', adventure.data[0]);
    yield put({ type: 'SET_ADVENTURE_INFO', payload: adventure.data[0] });
    
  } catch (error) {
    console.log('Art adventure get request failed: ', error);
  }
}

function* addArtAdventure(action) {
    try {
        console.log('New adventure:', action.payload);
        yield axios.post('/api/admin/art-adventure', action.payload); 
        yield put({type: 'FETCH_ADVENTURE_LIST' }); 
    } catch (error) {
        console.log('Error adding new adventure: ', error);
    }
}

function* updateArtAdventure(action) {
    console.log('in edit saga', action.payload);
    try{
        yield axios.put(`/api/admin/art-adventure/${action.payload.id}`, action.payload); 
        yield put({type: 'FETCH_ADVENTURE_LIST'}); 
        yield put({type: 'CLEAR_ADVENTURE'});
      } catch (error) {
        alert(`Sorry things aren't working at the moment. Please try again later.`);
        console.log('Error updating art adventure info: ', error);
    }
}

function* deleteArtAdventure(action) {
    try{
        yield axios.delete(`/api/admin/art-adventure/${action.payload}`); 
        yield put({type: 'FETCH_ADVENTURE_LIST'}); 
    } catch (error) {
        console.log('Error deleting adventure: ', error);
    }
}

function* getSeeList(action) {
  try {
    const sees = yield axios.get(`/api/admin/art-adventure/${action.payload}/see`); 
    console.log('get all sees for adventure:', sees.data);
    yield put({ type: 'SET_SEE', payload: sees.data });
  } catch (error) {
    console.log('Art adventure SEE List get request failed', error);
  }
}

function* getSee(action) {
  try {
    const see = yield axios.get(`/api/admin/art-adventure/see/${action.payload}`); 
    console.log('get one specific SEE for adventure:', see.data[0]);
    yield put({ type: 'SET_SEE_INFO', payload: see.data[0] });
    
  } catch (error) {
    console.log('Art adventure SEE get request failed: ', error);
  }
}

function* addSee(action) {
  try{
      console.log('New See for Adventure:', action.payload);
      yield axios.post('/api/admin/art-adventure/see', action.payload);
      yield put({type: 'FETCH_SEE_LIST' }); //Double check on this action, etc.
  } catch (error) {
      console.log(`Error adding 'See' to adventure: `, error);
  }
}

function* addDo(action) {
  try{
      console.log('New Do for Adventure:', action.payload);
      yield axios.post('/api/admin/art-adventure/do', action.payload);
      //yield put({ }) TODO - Does this need to be added to a list reducer for any reason?
  } catch (error) {
      console.log(`Error adding 'Do' to adventure: `, error);
  }
}

function* adminArtAdventureSaga() {
  yield takeEvery('FETCH_ADVENTURE_LIST', getArtAdventureList);
  yield takeEvery('FETCH_ADVENTURE', getArtAdventure);
  yield takeEvery('ADD_ADVENTURE', addArtAdventure);
  yield takeEvery('UPDATE_ADVENTURE_INFO', updateArtAdventure); 
  yield takeEvery('DELETE_ADVENTURE', deleteArtAdventure);
  yield takeEvery('FETCH_SEE_LIST', getSeeList);
  yield takeEvery('FETCH_SEE', getSee);
  yield takeEvery('ADD_SEE', addSee);
  yield takeEvery('ADD_DO', addDo);
}

export default adminArtAdventureSaga;