import React, { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AdminRoute from '../AdminRoute/AdminRoute'
import AboutPage from '../AboutPage/AboutPage';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AdminArtist from '../AdminArtist/AdminArtist';
import AdminArtwork from '../AdminArtwork/AdminArtwork';
import AdminCollection from '../AdminCollection/AdminCollection';
import AdminSponsor from '../AdminSponsor/AdminSponsor';
import AdminQuote from '../AdminQuote/AdminQuote';
import AdminArtAdventure from '../AdminArtAdventure/AdminArtAdventure';
import AdminLanding from '../AdminLanding/AdminLanding'
import MapView from '../MapView/MapView'
import AdminRegister from '../AdminRegister/AdminRegister'

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import WelcomePage1 from '../WelcomePage/WelcomePage1';
import WelcomePage2 from '../WelcomePage/WelcomePage2';
import WelcomePage3 from '../WelcomePage/WelcomePage3';
import WelcomePage4 from '../WelcomePage/WelcomePage4';
import SponsorDetail from '../SponsorDetail/SponsorDetail';
import EmailPage from '../EmailPage/EmailPage';
import Collection from '../Collection/Collection';
import CollectionDetail from '../CollectionDetail/CollectionDetail';
import ArtworkDetail from '../ArtworkDetail/ArtworkDetail';
import SeePage from '../SeePage/SeePage';
import ArtistDetail from '../ArtistDetail/ArtistDetail'
import SayPage from '../SayPage/SayPage';
import DoPage from '../DoPage/DoPage';
import Adventure from '../Adventure/Adventure';
import AdventureSeePage from '../AdventureSeePage/AdventureSeePage';
import AdventureDoPage from '../AdventureDoPage/AdventureDoPage';

import './App.css';
import { Email } from '@material-ui/icons';

import Menu from '../Menu/Menu'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#DC0100',
        white: 'white'
      },
      secondary: {
        main: '#118ADA'
      }
    },
    typography: {
      Pacifico: 'Pacifico',
      Lato: 'Lato',
    }
  })

  // Grab users location and store it in local state
  useEffect(() => {
    axios({
      method: 'POST',
      url: `https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.REACT_APP_GOOGLE_KEY}`,
    })
      .then(res => {
        console.log(res.data)
        setUserLat(res.data.location.lat)
        setUserLng(res.data.location.lng)

      }, (err => {
        console.log(err)
      }))
  }, []);


  const [userLat, setUserLat] = useState(null);
  console.log("user lat: ", userLat);
  const [userLng, setUserLng] = useState(null);
  console.log("user lng: ", userLng);
  //  const [geoAvailable, setGeoAvailable] = useState(false);

  const user = useSelector(store => store.user);

  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Menu />
        <div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/welcome1" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            <Route
              exact
              path="/map"
            >
              <MapView userLat={userLat} userLng={userLng} />
            </Route>

            <Route
              exact
              path="/artist_detail/:id"
            >
              <ArtistDetail />
            </Route>

            {/* This is where the collection detail is */}
            <Route
              exact
              path="/artworkdetail/:id"
            >
              <ArtworkDetail userLat={userLat} userLng={userLng} />
            </Route>

            <Route
              exact
              path="/adventure/:id"
            >
              <Adventure />
            </Route>

            <Route
              exact
              path="/see/:id"
            >
              <SeePage />
            </Route>

            {/* This is for the adventure see */}
            <Route
              exact
              path="/adventure/see/:id"
            >
              <AdventureSeePage />
            </Route>

            <Route
              exact
              path="/adventure/do/:id"
            >
              <AdventureDoPage />
            </Route>

            <Route
              exact
              path="/say/:id"
            >
              <SayPage />
            </Route>

            <Route
              exact
              path="/do/:id"
            >
              <DoPage />
            </Route>

            {/* ------------ADMIN PAGES----------------- */}

            <ProtectedRoute
              exact
              path="/admin/landing"
            >
              <AdminLanding />
            </ProtectedRoute>

            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/admin/register"
            >
              <AdminRegister />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/admin/artist"
            >
              <AdminArtist />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/admin/artwork"
            >
              <AdminArtwork truncateString={truncateString} />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/admin/collection"
            >
              <AdminCollection />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/admin/sponsor"
            >
              <AdminSponsor />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/admin/quote"
            >
              <AdminQuote />
            </ProtectedRoute>

            <ProtectedRoute
              exact
              path="/admin/art-adventure"
            >
              <AdminArtAdventure truncateString={truncateString} />
            </ProtectedRoute>

            {/* ------------------- END ADMIN ROUTES ------------------- */}

            <Route
              exact
              path="/home"
            >
              <HomePage />
            </Route>

            {/* route for all the collection */}
            <Route
              exact
              path='/collection'>
              <Collection />
            </Route>

            {/* route for the specific collection */}
            <Route
              exact
              path='/collectionDetail/:id'>
              <CollectionDetail userLat={userLat} userLng={userLng} />
            </Route>

            <Route
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              authRedirect="/user"
            >
              <LoginPage />
            </Route>

            <Route
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              authRedirect="/user"
            >
              <RegisterPage />
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            {/* <Route>
              <h1>404</h1>
            </Route> */}
          </Switch>

          {/* these are the routes for the four welcome pages that great the user on start-up */}
          <Route
            exact path='/welcome1'
          >
            <WelcomePage1></WelcomePage1>
          </Route>
          <Route
            exact path='/welcome2'
          >
            <WelcomePage2></WelcomePage2>
          </Route>
          <Route
            exact path='/welcome3'
          >
            <WelcomePage3></WelcomePage3>
          </Route>
          <Route
            exact path='/welcome4'
          >
            <WelcomePage4></WelcomePage4>
          </Route>

          {/* route for the specific sponsor */}
          <Route
            exact path='/sponsor/:id'
          >
            <SponsorDetail userLat={userLat} userLng={userLng} />
          </Route>

          {/* route for the page for the user to enter their email*/}
          <Route
            exact path='/email'
          >
            <EmailPage />
          </Route>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
