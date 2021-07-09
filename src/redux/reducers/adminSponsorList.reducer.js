//stores sponsor list returned from DB 
const adminSponsorListReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SPONSOR':
      return action.payload;
    default:
      return state;
  }
};

export default adminSponsorListReducer;