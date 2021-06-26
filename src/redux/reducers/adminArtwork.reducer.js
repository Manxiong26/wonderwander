//stores one specific artwork's details returned from DB based on id
const adminArtworkInfoReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ARTWORK_INFO': 
        return action.payload;
      case 'CLEAR_ARTWORK':
        return {}; 
      default:
        return state;
    }
};

export default adminArtworkInfoReducer;