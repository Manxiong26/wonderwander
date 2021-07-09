//stores DO list for a specific artwork returned from DB 
const adminDoListArtworkReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_DO_ARTWORK':
      return action.payload;
    default:
      return state;
  }
};

export default adminDoListArtworkReducer;