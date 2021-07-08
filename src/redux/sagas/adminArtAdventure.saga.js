import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: fired on "FETCH_ADVENTURE_LIST" actions dispatched from loading art adventure list on page mount
function* getArtAdventureList() {
  try {
    const adventures = yield axios.get('/api/admin/art-adventure');
    yield put({ type: 'SET_ADVENTURE', payload: adventures.data });
  } catch (error) {
    console.log('Art adventure List get request failed', error);
  }
}

function* getArtAdventure(action) {
  try {
    const adventure = yield axios.get(`/api/admin/art-adventure/${action.payload}`);
    yield put({ type: 'SET_ADVENTURE_INFO', payload: adventure.data[0] });
  } catch (error) {
    console.log('Art adventure get request failed: ', error);
  }
}

function* addArtAdventure(action) {
  try {
    yield axios.post('/api/admin/art-adventure', action.payload);
    yield put({ type: 'FETCH_ADVENTURE_LIST' });
  } catch (error) {
    console.log('Error adding new adventure: ', error);
  }
}

function* updateArtAdventure(action) {
  try {
    yield axios.put(`/api/admin/art-adventure/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_ADVENTURE_LIST' });
    yield put({ type: 'CLEAR_ADVENTURE' });
  } catch (error) {
    alert(`Sorry things aren't working at the moment. Please try again later.`);
    console.log('Error updating art adventure info: ', error);
  }
}

function* updatePublish(action) {
  try {
    yield axios.put(`/api/admin/art-adventure/publish/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_ADVENTURE_LIST' });
    yield put({ type: 'CLEAR_ADVENTURE' });
  } catch (error) {
    console.log('Error updating publish: ', error);
  }
}

function* deleteArtAdventure(action) {
  try {
    yield axios.delete(`/api/admin/art-adventure/${action.payload}`);
    yield put({ type: 'FETCH_ADVENTURE_LIST' });
  } catch (error) {
    console.log('Error deleting adventure: ', error);
  }
}

function* getSeeList(action) {
  try {
    const sees = yield axios.get(`/api/admin/art-adventure/${action.payload}/see`);
    yield put({ type: 'SET_SEE', payload: sees.data });
  } catch (error) {
    console.log('Art adventure SEE List get request failed', error);
  }
}

function* getSee(action) {
  try {
    const see = yield axios.get(`/api/admin/art-adventure/see/${action.payload}`);
    yield put({ type: 'SET_SEE_INFO', payload: see.data[0] });
  } catch (error) {
    console.log('Art adventure SEE get request failed: ', error);
  }
}

function* addSee(action) {
  try {
    yield axios.post('/api/admin/art-adventure/see', action.payload);
    yield put({ type: 'FETCH_SEE_LIST' });
  } catch (error) {
    console.log(`Error adding 'See' to adventure: `, error);
  }
}

function* updatePublishSee(action) {
  try {
    yield axios.put(`/api/admin/art-adventure/see/publish/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_SEE_LIST' });
    yield put({ type: 'CLEAR_SEE' });
  } catch (error) {
    console.log('Error updating see publish: ', error);
  }
}

function* deleteSee(action) {
  try {
    yield axios.delete(`/api/admin/art-adventure/see/${action.payload}`);
    yield put({ type: 'FETCH_SEE_LIST' });
  } catch (error) {
    console.log('Error deleting see: ', error);
  }
}

function* getDoList(action) {
  try {
    const dos = yield axios.get(`/api/admin/art-adventure/${action.payload}/do`);
    yield put({ type: 'SET_DO', payload: dos.data });
  } catch (error) {
    console.log('Art adventure DO List get request failed', error);
  }
}

function* getDo(action) {
  try {
    const doo = yield axios.get(`/api/admin/art-adventure/do/${action.payload}`);
    yield put({ type: 'SET_DO_INFO', payload: doo.data[0] });
  } catch (error) {
    console.log('Art adventure DO get request failed: ', error);
  }
}

function* addDo(action) {
  try {
    yield axios.post('/api/admin/art-adventure/do', action.payload);
    yield put({ type: 'FETCH_DO_LIST' });
  } catch (error) {
    console.log(`Error adding 'Do' to adventure: `, error);
  }
}

function* updatePublishDo(action) {
  try {
    yield axios.put(`/api/admin/art-adventure/do/publish/${action.payload.id}`, action.payload);
    yield put({ type: 'FETCH_DO_LIST' });
    yield put({ type: 'CLEAR_DO' });
  } catch (error) {
    console.log('Error updating Do publish: ', error);
  }
}

function* deleteDo(action) {
  try {
    yield axios.delete(`/api/admin/art-adventure/do/${action.payload}`);
    yield put({ type: 'FETCH_DO_LIST' });
  } catch (error) {
    console.log('Error deleting do: ', error);
  }
}

function* adminArtAdventureSaga() {
  yield takeEvery('FETCH_ADVENTURE_LIST', getArtAdventureList);
  yield takeEvery('FETCH_ADVENTURE', getArtAdventure);
  yield takeEvery('ADD_ADVENTURE', addArtAdventure);
  yield takeEvery('UPDATE_ADVENTURE_INFO', updateArtAdventure);
  yield takeEvery('UPDATE_PUBLISH_ADVENTURE', updatePublish);
  yield takeEvery('DELETE_ADVENTURE', deleteArtAdventure);
  yield takeEvery('FETCH_SEE_LIST', getSeeList);
  yield takeEvery('FETCH_SEE', getSee);
  yield takeEvery('ADD_SEE', addSee);
  yield takeEvery('UPDATE_PUBLISH_SEE', updatePublishSee);
  yield takeEvery('DELETE_SEE', deleteSee);
  yield takeEvery('FETCH_DO_LIST', getDoList);
  yield takeEvery('FETCH_DO', getDo);
  yield takeEvery('ADD_DO', addDo);
  yield takeEvery('UPDATE_PUBLISH_DO', updatePublishDo);
  yield takeEvery('DELETE_DO', deleteDo);
}

export default adminArtAdventureSaga;