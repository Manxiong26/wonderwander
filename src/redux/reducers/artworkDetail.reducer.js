const artworkDetailReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ART_DETAIL':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default artworkDetailReducer;