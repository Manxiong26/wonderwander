import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// GET request for artist detail
// Response sets reducer
function* getAdventureDetail() {
    try{
        const response = yield axios.get(`/api/adventure/`)
        console.log('Adventure from server: ', response.data)
        yield put({ type: 'SET_ADVENTURE_DETAIL', payload: response.data })
    } catch (err) {
        console.log('Error Getting adventure detail info in saga.')
    }
}

function* fetchAdventure(action){
    try {
        let id = action.payload;
        const response = yield axios.get(`/api/artworkdetail/${id}`);
        yield put ({type: 'SET_ADVENTURE', payload: response.data});
        console.log('error in fetchArtdetail under yield put', response.data);
    } catch {
        console.log('Error with getting Artwork detail');
    }
}

function* adventureSaga() {
    yield takeLatest('FETCH_ADVENTURE_DETAIL', getAdventureDetail);
    yield takeLatest('FETCH_ADVENTURE', fetchAdventure);
}

export default adventureSaga;