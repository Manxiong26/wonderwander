// reducer to set state of random art from server
const randomArtReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_RANDOM_ART':
            return action.payload;
        default:
            return state;
    }
};

export default randomArtReducer;
