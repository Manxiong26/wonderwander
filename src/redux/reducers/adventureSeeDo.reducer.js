import { combineReducers } from "redux";

// reducer to set state of the do for adventure
const doAdventureReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DO_ADVENTURE':
            return action.payload;
        default:
            return state;
    }
};

// reducer to set state of the see for adventure
const seeAdventureReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEE_ADVENTURE':
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    doAdventureReducer,
    seeAdventureReducer,
});
