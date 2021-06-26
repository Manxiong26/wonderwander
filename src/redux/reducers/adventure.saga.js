const adventureReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_ADVENTURE_DETAIL':
        return action.payload;
      case 'CLEAR_ADVENTURE_DETAIL':
        return [];
      default:
        return state;
    }
  };
  
  export default adventureReducer;