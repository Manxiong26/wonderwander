import { combineReducers } from "redux";

const doAdventureReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DO_ADVENTURE':
            return action.payload;
        default:
            return state;
    }
};

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
