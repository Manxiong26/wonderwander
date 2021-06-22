const sponsorDetails = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SPONSOR_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

export default sponsorDetails;