//stores artist list returned from DB 
const adminArtistListReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ARTIST':
      return action.payload;
    default:
      return state;
  }
};

export default adminArtistListReducer;