import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// GET request for artist detail
// Response sets reducer
function* getAdventureDetail(action) {
    try{
        const response = yield axios.get(`/api/adventure/${action.payload}`)
        console.log('Adventure from server: ', response.data)
        yield put({ type: 'SET_ADVENTURE_DETAIL', payload: response.data })
    } catch (err) {
        console.log('Error Getting adventure detail info in saga.')
    }
}


function* adventureSaga() {
    yield takeLatest('FETCH_ADVENTURE_DETAIL', getAdventureDetail);
}

export default adventureSaga;