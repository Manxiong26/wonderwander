//stores one specific SEE's details returned from DB based on id
const adminSeeInfoReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SEE_INFO': 
        return action.payload;
      case 'CLEAR_SEE':
        return {}; 
      default:
        return state;
    }
};

export default adminSeeInfoReducer;