const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const randomQuoteRouter = require('./routes/random.quote.router');
const randomArtRouter = require('./routes/random.art.router');
const sponsorArtRouter = require('./routes/sponsor.art.router');
const sponsorDetailsRouter = require('./routes/sponsor.details.router');

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
app.use('/api/random-quote', randomQuoteRouter);
app.use('/api/random-art', randomArtRouter);
app.use('/api/sponsor-art', sponsorArtRouter);
app.use('/api/sponsor', sponsorDetailsRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
