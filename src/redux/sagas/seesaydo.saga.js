import { put, takeLatest } from "@redux-saga/core/effects";
import axios from "axios";

function* fetchDo(action){
    try {
        const response = yield axios.get(`/api/do/${action.payload}`);
        console.log(response.data);
        yield put ({type: 'SET_DO', payload: response.data});
    } catch {
        console.log('Error with getting do list');
    }
}

function* fetchSay(){
    try{
        const response = yield axios.get(`/api/say`);
        console.log(response.data);
        yield put({type: 'SET_SAY_DETAIL', payload: response.data})
    } catch (error) {
        console.log('error in fetchSay');
    }
}

function* fetchSee(action){
    try{
        const response = yield axios.get(`/api/see/${action.payload}`);
        console.log(response.data);
        yield put({type: 'SET_SEE_DETAIL', payload: response.data})
    } catch (error) {
        console.log('error in fetchSay');
    }
}

function* seesaydoSaga(){
    yield takeLatest('FETCH_DO', fetchDo);
    yield takeLatest('FETCH_SAY_DETAIL', fetchSay);
    yield takeLatest('FETCH_SEE_DETAIL', fetchSee);
}

export default seesaydoSaga;