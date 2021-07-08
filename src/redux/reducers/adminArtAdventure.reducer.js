//stores one specific art adventure's details returned from DB based on id
const adminArtAdventureInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ADVENTURE_INFO':
      return action.payload;
    case 'CLEAR_ADVENTURE':
      return {};
    default:
      return state;
  }
};

export default adminArtAdventureInfoReducer;