const randomQuoteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_RANDOM_QUOTE':
            return action.payload;
        default:
            return state;
    }
};

export default randomQuoteReducer;