import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import adminArtistSaga from './adminArtist.saga';
import adminArtworkSaga from './adminArtwork.saga';
import adminCollectionSaga from './adminCollection.saga';
import adminSponsorSaga from './adminSponsor.saga';
import adminQuoteSaga from './adminQuote.saga';
import adminArtAdventureSaga from './adminArtAdventure.saga';
import artworkSaga from './artwork.saga'
import randomQuoteSaga from './randomQuote.saga';
import randomArtSaga from './randomArt.saga';
import sponsorDetailsSaga from './sponsorDetails.saga';
import sponsorArtSaga from './sponsorArt.saga';
import artDetailSaga from './artworkdetail.saga';
import collectionSaga from './collection.saga';
import threeCollectionSaga from './collection.3.saga';
import getCollectionDetailSaga from './collection.detail.saga';

import seesaydoSaga from './seesaydo.saga';

import artistSaga from './artist.saga'

import addTaskSeenSaga from './addTaskSeen.saga';

import adventureSaga from './artAdventure.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    adminArtistSaga(),
    adminArtworkSaga(),
    adminCollectionSaga(),
    adminSponsorSaga(),
    adminQuoteSaga(),
    adminArtAdventureSaga(),
    artworkSaga(),
    randomQuoteSaga(),
    randomArtSaga(),
    sponsorDetailsSaga(),
    sponsorArtSaga(),
    artDetailSaga(),
    collectionSaga(),
    threeCollectionSaga(),
    getCollectionDetailSaga(),
    artistSaga(),

    seesaydoSaga(),

    addTaskSeenSaga(),

    adventureSaga(),

  ]);
}
