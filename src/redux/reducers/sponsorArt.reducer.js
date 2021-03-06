// reducer to set state of art for a sponsor
const sponsorArt = (state = [], action) => {
    switch (action.type) {
        case 'SET_SPONSOR_ART':
            return action.payload;
        default:
            return state;
    }
}

export default sponsorArt;