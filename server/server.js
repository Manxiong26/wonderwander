const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

//import for AWS
const UploaderS3Router = require('react-dropzone-s3-uploader/s3router');

// Route includes
const userRouter = require('./routes/user.router');
//const adminRouter = require('./routes/user.admin.router')
const adminArtistRouter = require('./routes/AdminRoutes/admin-artist.router');
const adminArtworkRouter = require('./routes/AdminRoutes/admin-artwork.router');
const adminCollectionRouter = require('./routes/AdminRoutes/admin-collection.router');
const adminSponsorRouter = require('./routes/AdminRoutes/admin-sponsor.router');
const adminQuoteRouter = require('./routes/AdminRoutes/admin-quote.router');
const adminArtAdventureRouter = require('./routes/AdminRoutes/admin-artAdventures.router');
const artworkRouter = require('./routes/artwork.router');
const randomQuoteRouter = require('./routes/random.quote.router');
const randomArtRouter = require('./routes/random.art.router');
const artworkDetailRouter = require('./routes/artworkdetail.router');
const sponsorArtRouter = require('./routes/sponsor.art.router');
const sponsorDetailsRouter = require('./routes/sponsor.details.router');
const collectionRouter = require('./routes/collection.router');
const artistRouter = require('./routes/artist.router');
const doRouter = require('./routes/do.router');
const seeRouter = require('./routes/see.router');
const sayRouter = require('./routes/say.router');
const otherRouter = require('./routes/otheradventures.router');
const adventureSeeRouter = require('./routes/adventuresee.router');
const adventureDoRouter = require('./routes/adventuredo.router');
const imageUrlRouter = require('./routes/imageUrl.router');
const viewedArtRouter = require('./routes/viewedArt.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
// app.use('/api/admin', adminRouter)
app.use('/api/admin/artist', adminArtistRouter);
app.use('/api/admin/artwork', adminArtworkRouter);
app.use('/api/admin/collection', adminCollectionRouter);
app.use('/api/admin/sponsor', adminSponsorRouter);
app.use('/api/admin/quote', adminQuoteRouter);
app.use('/api/admin/art-adventure', adminArtAdventureRouter);
app.use('/api/artwork', artworkRouter);
app.use('/api/random-quote', randomQuoteRouter);
app.use('/api/random-art', randomArtRouter);
app.use('/api/sponsor-art', sponsorArtRouter);
app.use('/api/sponsor', sponsorDetailsRouter);
app.use('/api/artworkdetail', artworkDetailRouter);
app.use('/api/collection', collectionRouter);
app.use('/api/artist', artistRouter);
app.use('/api/do', doRouter);
app.use('/api/see', seeRouter);
app.use('/api/say', sayRouter);
app.use('/api/adventure', otherRouter);
app.use('/api/adventure/see', adventureSeeRouter);
app.use('/api/adventure/do', adventureDoRouter);
app.use('/api/imageurl', imageUrlRouter);
app.use('/api/viewed', viewedArtRouter)


//route for AWS image upload
app.use('/s3', UploaderS3Router({
  bucket: 'wonder-wander-bucket',
  region: 'us-east-2',
  headers: {'Access-Control-Allow-Origin': '*'},
  ACL: 'public-read',
}));

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
