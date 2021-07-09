
// reducer to set state of the detail for an artwork
const artworkDetailReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ART_DETAIL':
        return action.payload;
      case 'CLEAR_ART_DETAIL':
        return [];
      default:
        return state;
    }
  };
  
  export default artworkDetailReducer;