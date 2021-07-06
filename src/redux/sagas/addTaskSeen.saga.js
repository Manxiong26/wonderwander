import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';

function* addTaskSeen(action){
    try{
        yield axios.post('/api/artworkdetail', action.payload);
        // console.log('CHECKING PAYLOAD', action.payload);
        yield put({ type: 'FETCH_VIEWED_ART'})
    } catch(error){
        console.log('ERROR ADDING ARTWORK SAGA!!!!!', error);
        
    }
}

function* addTaskSeenSaga(){
    yield takeLatest('ADD_ARTWORK_SEEN', addTaskSeen)
}

export default addTaskSeenSaga;