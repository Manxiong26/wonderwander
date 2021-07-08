//stores one specific artist's details returned from DB based on id
const adminArtistInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ARTIST_INFO':
      return action.payload;
    case 'CLEAR_ARTIST':
      return {};
    default:
      return state;
  }
};

export default adminArtistInfoReducer;
