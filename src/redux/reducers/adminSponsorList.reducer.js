//stores sponsor list returned from DB 
const adminSponsorListReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SPONSOR': 
        return action.payload;
    //case 'CLEAR_SPONSOR':
    //  return [] or action.payload;
      default:
        return state;
    }
};
  
export default adminSponsorListReducer;