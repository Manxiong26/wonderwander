// import { combineReducers } from 'redux';

// //stores artist list returned from DB 
// const artistListReducer = (state = [], action) => {
//     switch (action.type) {
//       case 'SET_ARTIST': //Double check that this is the correct action type
//         return action.payload;
//     //  case 'CLEAR_ARTIST':
//     //    return [] or action.payload;
//       default:
//         return state;
//     }
// };

//stores one specific artist's details returned from DB based on id
const adminArtistInfoReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ARTIST_INFO': 
        return action.payload;
      case 'CLEAR_ARTIST':
        return {}; 
      default:
        return state;
    }
};

export default adminArtistInfoReducer;

// export default combineReducers({
//     adminArtistListReducer,
//     adminArtistInfoReducer,
// });
