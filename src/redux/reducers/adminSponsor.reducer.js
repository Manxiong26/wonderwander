//stores one specific sponsor's details returned from DB based on id
const adminSponsorInfoReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SPONSOR_INFO': 
        return action.payload;
      case 'CLEAR_SPONSOR':
        return {}; 
      default:
        return state;
    }
};

export default adminSponsorInfoReducer;