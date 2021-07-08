//stores collection list returned from DB 
const adminCollectionListReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_COLLECTION':
      return action.payload;
    default:
      return state;
  }
};

export default adminCollectionListReducer;