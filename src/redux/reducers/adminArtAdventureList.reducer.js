//stores art adventure list returned from DB 
const adminArtAdventureListReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ADVENTURE': 
        return action.payload;
    //case 'CLEAR_ADVENTURE':
    //  return [] or action.payload;
      default:
        return state;
    }
};
  
export default adminArtAdventureListReducer;