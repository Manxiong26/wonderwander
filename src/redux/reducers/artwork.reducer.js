// reducer to set state of artwork from server
const artworkReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ARTWORK':
      return action.payload;
    default:
      return state;
  }
};

export default artworkReducer;