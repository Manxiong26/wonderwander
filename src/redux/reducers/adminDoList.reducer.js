//stores DO list for a specific adventure returned from DB 
const adminDoListReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_DO':
      return action.payload;
    default:
      return state;
  }
};

export default adminDoListReducer;