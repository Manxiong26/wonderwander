//stores one specific quote's details returned from DB based on id
const adminQuoteInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_QUOTE_INFO':
      return action.payload;
    case 'CLEAR_QUOTE':
      return {};
    default:
      return state;
  }
};

export default adminQuoteInfoReducer;