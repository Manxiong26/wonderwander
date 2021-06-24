const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const artworkRouter = require('./routes/artwork.router')
const randomQuoteRouter = require('./routes/random.quote.router');
const randomArtRouter = require('./routes/random.art.router');
const artworkDetailRouter = require('./routes/artworkdetail.router')


const collectionRouter = require('./routes/collection.router');

const artistRouter = require('./routes/artist.router');
const seesaydoRouter = require('./routes/seesaydo.router');


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
app.use('/api/artwork', artworkRouter)
app.use('/api/random-quote', randomQuoteRouter);
app.use('/api/random-art', randomArtRouter);
app.use('/api/artworkdetail', artworkDetailRouter);

app.use('/api/collection', collectionRouter);

app.use('/api/artist', artistRouter);
app.use('/api/do', seesaydoRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
