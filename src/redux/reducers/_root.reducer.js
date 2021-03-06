import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import adminArtistListReducer from './adminArtistList.reducer';
import adminArtistInfoReducer from './adminArtist.reducer';
import adminArtworkListReducer from './adminArtworkList.reducer';
import adminArtworkInfoReducer from './adminArtwork.reducer';
import adminCollectionListReducer from './adminCollectionList.reducer';
import adminCollectionInfoReducer from './adminCollection.reducer';
import adminSponsorListReducer from './adminSponsorList.reducer';
import adminSponsorInfoReducer from './adminSponsor.reducer';
import adminQuoteListReducer from './adminQuoteList.reducer';
import adminQuoteInfoReducer from './adminQuote.reducer';
import adminArtAdventureListReducer from './adminArtAdventureList.reducer';
import adminArtAdventureInfoReducer from './adminArtAdventure.reducer';
import adminSeeListReducer from './adminSeeList.reducer';
import adminSeeInfoReducer from './adminSee.reducer';
import adminDoListReducer from './adminDoList.reducer';
import adminDoInfoReducer from './adminDo.reducer';
import adminSeeListArtworkReducer from './adminSeeListArtwork.reducer';
import adminSeeInfoArtworkReducer from './adminSeeArtwork.reducer';
import adminDoListArtworkReducer from './adminDoListArtwork.reducer';
import adminDoInfoArtworkReducer from './adminDoArtwork.reducer';
import artworkReducer from './artwork.reducer'
import randomQuote from './randomQuote.reducer';
import randomArt from './randomArt.reducer';
import sponsorArt from './sponsorArt.reducer';
import sponsorDetails from './sponsorDetails.reducer';
import artworkDetailReducer from './artworkDetail.reducer';
import collection from './collection.reducer';
import collectionThree from './collection.3.reducer';
import collectionDetail from './collection.detail.reducer';
import adventureSeeDo from './adventureSeeDo.reducer';
import viewedArt from './viewedArt.reducer';
import seesaydoReducer from './seesaydo.reducer';
import artistDetail from './artist.reducer';
import adventureReducer from './adventure.reducer';
import imageUrlReducer from './imageUrl.reducer';
import voteNumber from './voteNumber.reducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  adminArtistListReducer,
  adminArtistInfoReducer,
  adminArtworkListReducer,
  adminArtworkInfoReducer,
  adminCollectionListReducer,
  adminCollectionInfoReducer,
  adminSponsorListReducer,
  adminSponsorInfoReducer,
  adminQuoteListReducer,
  adminQuoteInfoReducer,
  adminArtAdventureListReducer,
  adminArtAdventureInfoReducer,
  adminSeeListReducer,
  adminSeeInfoReducer,
  adminDoListReducer,
  adminDoInfoReducer,
  adminSeeListArtworkReducer,
  adminSeeInfoArtworkReducer,
  adminDoListArtworkReducer,
  adminDoInfoArtworkReducer,
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
  adventureReducer,
  adventureSeeDo,
  imageUrlReducer,
  voteNumber,
  viewedArt,
});

export default rootReducer;
