import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Response sets reducer
function* fetchAdventure() {
    try{
        const response = yield axios.get(`/api/adventure/`)
        console.log('Adventure from server: ', response.data)
        yield put({ type: 'SET_ADVENTURE', payload: response.data })
    } catch (err) {
        console.log('Error Getting adventure detail info in saga.')
    }
}

// GET request for specific adventure details
function* getAdventureDetail(action){
    try {
        let id = action.payload;
        const response = yield axios.get(`/api/adventure/${id}`);
        yield put ({type: 'SET_ADVENTURE_DETAIL', payload: response.data});
    } catch (err) {
        console.log('Error with getting Adventure Detail', err);
    }
}

function* adventureSaga() {
    yield takeLatest('FETCH_ADVENTURE_DETAIL', getAdventureDetail);
    yield takeLatest('FETCH_ADVENTURES', fetchAdventure);
}

export default adventureSaga;