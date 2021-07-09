import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

// function to fetch a specific do from the server
function* fetchDo(action){
    try {

        //server get request
        const response = yield axios.get(`/api/do/${action.payload}`);
        
        // then sets the reducer to the response
        yield put ({type: 'SET_DO', payload: response.data});

    // error if one occurs 
    } catch {
        console.log('Error with getting do list');
    }
}

// function to fetch the specific say from the server
function* fetchSay(action){
    try{

        // get request to get specific say from the server 
        const response = yield axios.get(`/api/say/${action.payload}`);
        
        // then sets the reducer to the response
        yield put({type: 'SET_SAY_DETAIL', payload: response.data})

    // error if one occurs
    } catch (error) {
        console.log('error in fetchSay');
    }
}

// function to fetch specific see from the server
function* fetchSee(action){
    try{

        // get request to server
        const response = yield axios.get(`/api/see/${action.payload}`);
       
        // will then set the reducer to the response
        yield put({type: 'SET_SEE_DETAIL', payload: response.data})

    // error if one occurs
    } catch (error) {
        console.log('error in fetchSay');
    }
}

// will run the above functions when the below dispatches are received from the client
function* seesaydoSaga(){
    yield takeLatest('FETCH_DO', fetchDo);
    yield takeLatest('FETCH_SAY_DETAIL', fetchSay);
    yield takeLatest('FETCH_SEE_DETAIL', fetchSee);
}

export default seesaydoSaga;