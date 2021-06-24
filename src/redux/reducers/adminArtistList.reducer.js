//stores artist list returned from DB 
const adminArtistListReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ARTIST': 
        return action.payload;
    //case 'CLEAR_ARTIST':
    //  return [] or action.payload;
      default:
        return state;
    }
};
  
export default adminArtistListReducer;

//NOTE: Once this file is tested and functional it can be moved to artist.reducer and deleted.