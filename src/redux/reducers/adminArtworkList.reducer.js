//stores artwork list returned from DB 
const adminArtworkListReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ARTWORK': 
        return action.payload;
    //case 'CLEAR_ARTWORK':
    //  return [] or action.payload;
      default:
        return state;
    }
};
  
export default adminArtworkListReducer;