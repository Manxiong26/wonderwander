import { combineReducers } from "redux";

const doReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DO':
            return action.payload;
        default:
            return state;
    }
};

const sayReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SAY_DETAIL':
            return action.payload;
        default:
            return state;
    }
};

const seeReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SEE_DETAIL':
            return action.payload;
        default:
            return state;
    }
};

export default combineReducers({
    doReducer,
    sayReducer,
    seeReducer,
});
