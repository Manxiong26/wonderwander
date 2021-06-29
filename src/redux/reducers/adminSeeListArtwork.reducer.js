//stores SEE list for a specific artwork returned from DB 
const adminSeeListArtworkReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SEE_ARTWORK': 
        return action.payload;
    //case 'CLEAR_SEE_ARTWORK':
    //  return [] or action.payload;
      default:
        return state;
    }
};
  
export default adminSeeListArtworkReducer;