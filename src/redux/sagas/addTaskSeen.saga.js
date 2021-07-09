import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';

// function that handles if an artwork was seen by the user
function* addTaskSeen(action){
    try{

        // makes a post to the server to insert into the database that the logged-in user marked a piece of artwork as seen
        yield axios.post('/api/artworkdetail', action.payload);

        // after the post, then fetches the viewed art
        yield put({ type: 'FETCH_VIEWED_ART'})
    } catch(error){
        console.log('Error adding artwork seen by user', error);
        
    }
}

// function that will run the above function if the dispatch below is received from the clients
function* addTaskSeenSaga(){
    yield takeLatest('ADD_ARTWORK_SEEN', addTaskSeen)
}

export default addTaskSeenSaga;