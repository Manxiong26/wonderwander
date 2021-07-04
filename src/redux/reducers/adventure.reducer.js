import { combineReducers } from "redux";

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


