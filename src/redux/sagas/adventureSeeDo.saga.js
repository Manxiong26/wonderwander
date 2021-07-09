import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

//function to handle the fetching of adventure do details
function* fetchAdventureDo(action){

    // makes get request to the server to fetch the specific do information for a certain adventure
    try {
        const response = yield axios.get(`/api/adventure/do/${action.payload}`);
       
        // then sends the payload back to the client
        yield put ({type: 'SET_DO_ADVENTURE', payload: response.data});

    // error if one occurs
    } catch {
        console.log('Error with getting do list');
    }
}

//function to handle fetching the specific see information for an adventure
function* fetchAdventureSee(action){

    // makes get request to server to fetch information for a specific see for a specific adventure
    try{
        const response = yield axios.get(`/api/adventure/see/${action.payload}`);

        // then sends the payload back to the client
        yield put({type: 'SET_SEE_ADVENTURE', payload: response.data})

    // error if one occurs
    } catch (error) {
        console.log('error in fetchSayAdventure');
    }
}

// // will run the above functions when the below dispatches are received from the client
function* seesaydoAdventureSaga(){
    yield takeLatest('FETCH_DO_ADVENTURE', fetchAdventureDo);
    yield takeLatest('FETCH_SEE_ADVENTURE', fetchAdventureSee);
}

export default seesaydoAdventureSaga;
