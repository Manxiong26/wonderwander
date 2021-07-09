// reducer to set the state of the detail for an artist
const artistDetail = (state = [], action) => {
  switch (action.type) {
    case 'SET_ARTIST_DETAIL':
      return action.payload;
    default:
      return state;
  }
};

export default artistDetail;