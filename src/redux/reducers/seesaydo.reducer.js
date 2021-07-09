import { combineReducers } from "redux";

// reducer to set state of the do
const doReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DO':
            return action.payload;
        default:
            return state;
    }
};

// reducer to set state of say
const sayReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SAY_DETAIL':
            return action.payload;
        default:
            return state;
    }
};

// reducer to set state of see
const seeReducer = (state = [], action) => {
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
