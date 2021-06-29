//stores one specific DO's details returned from DB based on id
const adminDoInfoArtworkReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_DO_INFO_ARTWORK': 
        return action.payload;
      case 'CLEAR_DO_ARTWORK':
        return {}; 
      default:
        return state;
    }
};

export default adminDoInfoArtworkReducer;