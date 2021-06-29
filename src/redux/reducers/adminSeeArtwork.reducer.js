//stores one specific SEE's details returned from DB based on id
const adminSeeInfoArtworkReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SEE_INFO_ARTWORK': 
        return action.payload;
      case 'CLEAR_SEE_ARTWORK':
        return {}; 
      default:
        return state;
    }
};

export default adminSeeInfoArtworkReducer;