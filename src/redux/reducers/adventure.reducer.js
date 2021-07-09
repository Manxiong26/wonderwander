import { combineReducers } from "redux";

// reducer to set the state of the adventure from the saga/server
const adventureList = (state = [], action) => {
  switch (action.type) {
    case 'SET_ADVENTURE':
      return action.payload;
    case 'CLEAR_ADVENTURE':
      return [];
    default:
      return state;
  }
};

// reducer to set the state for the adventure detail
const adventureDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ADVENTURE_DETAIL':
      return action.payload;
    case 'CLEAR_ADVENTURE_DETAIL':
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  adventureList,
  adventureDetailReducer,
});


