//stores one specific collection's details returned from DB based on id
const adminCollectionInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_COLLECTION_INFO':
      return action.payload;
    case 'CLEAR_COLLECTION':
      return {};
    default:
      return state;
  }
};

export default adminCollectionInfoReducer;