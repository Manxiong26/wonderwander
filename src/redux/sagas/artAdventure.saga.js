import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Response sets reducer
function* fetchAdventure() {
    try{

        // get request to the server to fetch all the adventures from the server
        const response = yield axios.get(`/api/adventure/`)
        
        //then sets the reducer to the response from the server
        yield put({ type: 'SET_ADVENTURE', payload: response.data })

    // error if one occurs
    } catch (err) {
        console.log('Error Getting adventure detail info in saga.')
    }
}

// GET request for specific adventure details
function* getAdventureDetail(action){
    try {
        let id = action.payload;

        // get request to get specific adventure details
        const response = yield axios.get(`/api/adventure/${id}`);

        // sets reducer to the response
        yield put ({type: 'SET_ADVENTURE_DETAIL', payload: response.data});

    // error if one occurs
    } catch (err) {
        console.log('Error with getting Adventure Detail', err);
    }
}

// will run the above functions when the below dispatches are received from the client
function* adventureSaga() {
    yield takeLatest('FETCH_ADVENTURE_DETAIL', getAdventureDetail);
    yield takeLatest('FETCH_ADVENTURES', fetchAdventure);
}

export default adventureSaga;