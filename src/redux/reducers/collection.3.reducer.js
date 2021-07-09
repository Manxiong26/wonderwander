// reducer to set the state for three collections from server
const collectionThree = (state = [], action) => {
    switch (action.type) {
      case 'SET_THREE_COLLECTION':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default collectionThree;