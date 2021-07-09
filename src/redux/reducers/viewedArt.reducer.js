// reducer to set state of viewed art
const viewedReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_VIEWED_ART':
      return action.payload;
    default:
      return state;
  }
};

export default viewedReducer;