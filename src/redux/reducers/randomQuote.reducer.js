// reducer to set state of random quote from the server
const randomQuoteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_RANDOM_QUOTE':
            return action.payload;
        default:
            return state;
    }
};

export default randomQuoteReducer;