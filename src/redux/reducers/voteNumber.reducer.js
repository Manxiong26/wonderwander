// reducer to set the state of the total vote
const voteNumber = (state = [], action) => {
    switch (action.type) {
      case 'SET_TOTAL_VOTE':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default voteNumber;