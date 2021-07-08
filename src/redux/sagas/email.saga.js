import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* sendInfo(action) {
    console.log(action.payload)
    try {
        yield axios.post('/api/email', action.payload);
    } catch (error) {
        console.log('Error with adding new email:', error);
    }
}


function* emailSaga(){
    yield takeLatest('STORE_INFO', sendInfo);
}

export default emailSaga;