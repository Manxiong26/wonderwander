import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import artworkSaga from './artwork.saga'
import randomQuoteSaga from './randomQuote.saga';
import randomArtSaga from './randomArt.saga';
import artDetailSaga from './artworkdetail.saga';

import collectionSaga from './collection.saga';
import threeCollectionSaga from './collection.3.saga';
import getCollectionDetailSaga from './collection.detail.saga';

import artistSaga from './artist.saga'


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
    artworkSaga(),
    randomQuoteSaga(),
    randomArtSaga(),

    artDetailSaga(),


    collectionSaga(),
    threeCollectionSaga(),
    getCollectionDetailSaga(),

    artistSaga(),

  ]);
}
