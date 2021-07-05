const sponsorDetails = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SPONSOR_DETAILS':
            return action.payload;
        case 'CLEAR_SPONSOR_DETAILS':
            return {};
        default:
            return state;
    }
}

export default sponsorDetails;