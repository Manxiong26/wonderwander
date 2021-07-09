import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// function to send the email information to server
function* sendInfo(action) {
    
    // post request to send email information to the server to be stored in the database
    try {
        yield axios.post('/api/email', action.payload);

    // error if one occurs
    } catch (error) {
        console.log('Error with adding new email:', error);
    }
}

// will run the above function when the below dispatch is received from the client
function* emailSaga(){
    yield takeLatest('STORE_INFO', sendInfo);
}

export default emailSaga;