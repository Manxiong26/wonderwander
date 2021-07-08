// reducer to set state of collections from server
const collection = (state = [], action) => {
    switch (action.type) {
      case 'SET_COLLECTION':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default collection;