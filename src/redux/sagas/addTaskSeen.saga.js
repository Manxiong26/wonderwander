import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';

function* addTaskSeen(action){
    console.log('ADDING SEEN');
    console.log('CHECKING PAYLOAD', action.payload);
    try{
        yield axios.post('/api/artworkdetail', action.payload);
        console.log('CHECKING PAYLOAD', action.payload);
        
    } catch(error){
        console.log('ERROR ADDING ARTWORK SAGA!!!!!', error);
        
    }
}

function* addTaskSeenSaga(){
    yield takeLatest('ADD_ARTWORK_SEEN', addTaskSeen)
}

export default addTaskSeenSaga;