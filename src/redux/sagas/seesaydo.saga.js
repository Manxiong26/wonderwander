import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchDo(){
    try {
        const response = yield axios.get('/api/do');
        console.log(response.data);
        yield put ({type: 'SET_DO', payload: response.data});
    } catch {
        console.log('Error with getting do list');
    }
}

function* fetchSay(action){
    try{
        const response = yield axios.get(`/api/say/${action.payload}`);
        console.log(response.data);
        yield put({type: 'SET_SAY_DETAIL', payload: response.data})
    } catch (error) {
        console.log('error in fetchSay');
    }
}

function* seesaydoSaga(){
    yield takeLatest('FETCH_DO', fetchDo);
    yield takeLatest('FETCH_SAY_DETAIL', fetchSay);
}

export default seesaydoSaga;