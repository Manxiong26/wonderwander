//stores one specific DO's details returned from DB based on id
const adminDoInfoReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_DO_INFO': 
        return action.payload;
      case 'CLEAR_DO':
        return {}; 
      default:
        return state;
    }
};

export default adminDoInfoReducer;