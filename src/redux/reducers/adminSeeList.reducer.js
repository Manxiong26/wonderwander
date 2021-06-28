//stores SEE list returned from DB 
const adminSeeListReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SEE': 
        return action.payload;
    //case 'CLEAR_SEE_LIST':
    //  return [] or action.payload;
      default:
        return state;
    }
};
  
export default adminSeeListReducer;