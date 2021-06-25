import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import adminArtistListReducer from './adminArtistList.reducer';
import adminArtistInfoReducer from './adminArtist.reducer';
import artworkReducer from './artwork.reducer'
import randomQuote from './randomQuote.reducer';
import randomArt from './randomArt.reducer';
import sponsorArt from './sponsorArt.reducer';
import sponsorDetails from './sponsorDetails.reducer';
import artworkDetailReducer from './artworkDetail.reducer';
import collection from './collection.reducer';
import collectionThree from './collection.3.reducer';
import collectionDetail from './collection.detail.reducer';


// import artistDetail from './artist.reducer';

import seesaydoReducer from './seesaydo.reducer';

import artistDetail from './artist.reducer'



// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in

  adminArtistListReducer,
  adminArtistInfoReducer,
  artworkReducer,
  randomQuote,
  randomArt,
  sponsorArt,
  sponsorDetails,
  artworkDetailReducer,
  collection,
  collectionThree,
  collectionDetail,
  artistDetail,
  seesaydoReducer,


});

export default rootReducer;
