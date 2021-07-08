//stores SEE list for a specific adventure returned from DB 
const adminSeeListReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEE':
      return action.payload;
    default:
      return state;
  }
};

export default adminSeeListReducer;