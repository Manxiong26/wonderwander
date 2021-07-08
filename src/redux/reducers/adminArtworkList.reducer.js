//stores artwork list returned from DB 
const adminArtworkListReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ARTWORK':
      return action.payload;
    default:
      return state;
  }
};

export default adminArtworkListReducer;