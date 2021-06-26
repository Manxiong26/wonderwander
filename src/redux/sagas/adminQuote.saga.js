import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects'; 

// worker Saga: fired on "FETCH_QUOTE_LIST" actions dispatched from loading quote list on page mount
function* getQuoteList() {
  try {
    const quotes = yield axios.get('/api/admin/quote'); 
    console.log('get all quotes:', quotes.data);
    yield put({ type: 'SET_QUOTE', payload: quotes.data });
  } catch (error) {
    console.log('Quote List get request failed', error);
  }
}

function* getQuote(action) {
  try {
    const quote = yield axios.get(`/api/admin/quote/${action.payload}`); 
    console.log('get one specific quote:', quote.data[0]);
    yield put({ type: 'SET_QUOTE_INFO', payload: quote.data[0] });
    
  } catch (error) {
    console.log('Quote get request failed: ', error);
  }
}

function* addQuote(action) {
    try {
        console.log('New quote:', action.payload);
        yield axios.post('/api/admin/quote', action.payload); 
        yield put({type: 'FETCH_QUOTE_LIST' }); 
    } catch (error) {
        console.log('Error adding new quote: ', error);
    }
}

function* updateQuote(action) {
    console.log('in edit saga', action.payload);
    try{
        yield axios.put(`/api/admin/quote/${action.payload.id}`, action.payload); 
        yield put({type: 'FETCH_QUOTE_LIST'}); 
        yield put({type: 'CLEAR_QUOTE'});
      } catch (error) {
        alert(`Sorry things aren't working at the moment. Please try again later.`);
        console.log('Error updating quote info: ', error);
    }
}

function* deleteQuote(action) {
    try{
        yield axios.delete(`/api/admin/quote/${action.payload}`); 
        yield put({type: 'FETCH_QUOTE_LIST'}); 
    } catch (error) {
        console.log('Error deleting quote: ', error);
    }
}

function* adminQuoteSaga() {
  yield takeEvery('FETCH_QUOTE_LIST', getQuoteList);
  yield takeEvery('FETCH_QUOTE', getQuote);
  yield takeEvery('ADD_QUOTE', addQuote);
  yield takeEvery('UPDATE_QUOTE_INFO', updateQuote); 
  yield takeEvery('DELETE_QUOTE', deleteQuote);
}

export default adminQuoteSaga;