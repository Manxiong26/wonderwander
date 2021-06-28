import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchAdventureDo(action){
    try {
        const response = yield axios.get(`/api/adventure/do/${action.payload}`);
        console.log(response.data);
        yield put ({type: 'SET_DO_ADVENTURE', payload: response.data});
    } catch {
        console.log('Error with getting do list');
    }
}

function* fetchAdventureSee(action){
    try{
        const response = yield axios.get(`/api/adventure/see/${action.payload}`);
        console.log(response.data);
        yield put({type: 'SET_SEE_ADVENTURE', payload: response.data})
    } catch (error) {
        console.log('error in fetchSayAdventure');
    }
}

function* seesaydoAdventureSaga(){
    yield takeLatest('FETCH_DO_ADVENTURE', fetchAdventureDo);
    yield takeLatest('FETCH_SEE_ADVENTURE', fetchAdventureSee);
}

export default seesaydoAdventureSaga;
