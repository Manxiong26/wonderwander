import React, { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AdminRoute from '../AdminRoute/AdminRoute'

import AboutPage from '../AboutPage/AboutPage';
import HomePage from '../HomePage/HomePage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
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

    // Grab users location and store it
    // in local state
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

      //Calculates distance between two points
  function distance(lat1, lon1, lat2, lon2) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      const radlat1 = (Math.PI * lat1) / 180;
      const radlat2 = (Math.PI * lat2) / 180;
      const theta = lon1 - lon2;
      const radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;

      let miles = dist.toFixed(1);
      return miles + " mi away";
    }
  }
  
   
     const [userLat, setUserLat] = useState(null);
     console.log("user lat: ", userLat);
     const [userLng, setUserLng] = useState(null);
     console.log("user lng: ", userLng);
    //  const [geoAvailable, setGeoAvailable] = useState(false);

    const user = useSelector(store => store.user);
    console.log('Logged in user: ', user)

    

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Menu />
        <div>
          {/* <Nav /> */}
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/welcome1" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>
            <Route
            
              exact
              path="/map"
            >
                <MapView distance={distance} userLat={userLat} userLng={userLng}/>
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
            // Add in id
            path="/artworkdetail/:id"
            >
              <ArtworkDetail userLat={userLat} userLng={userLng} distance={distance} />
            </Route>

            <Route
            exact
            path="/adventure/:id"
            >
              <Adventure />
            </Route>

            <Route
            // Add in id
            exact
            path="/see/:id"
            >
              <SeePage />
            </Route>

            {/* Thi is for the adventure see */}
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
            path="/say"
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


            
            {/* this is temporary until we can get the log in working */}
            <ProtectedRoute
              // shows AdminArtist Page at all times (logged in or not)
              exact
              path="/admin/artist"
            >
              <AdminArtist />

            </ProtectedRoute>
            {/* this is temporary until we can get the log in working */}
            <ProtectedRoute
              // shows AdminArtwork Page at all times (logged in or not)
              exact
              path="/admin/artwork"
            >
              <AdminArtwork />
            </ProtectedRoute>
            {/* this is temporary until we can get the log in working */}
            <ProtectedRoute
              // shows AdminCollection Page at all times (logged in or not)
              exact
              path="/admin/collection"
            >
              <AdminCollection />
            </ProtectedRoute>
            {/* this is temporary until we can get the log in working */}
            <ProtectedRoute
              // shows AdminSponsor Page at all times (logged in or not)
              exact
              path="/admin/sponsor"
            >
              <AdminSponsor />
            </ProtectedRoute>
            {/* this is temporary until we can get the log in working */}
            <ProtectedRoute
              // shows AdminQuote Page at all times (logged in or not)
              exact
              path="/admin/quote"
            >
              <AdminQuote />
            </ProtectedRoute>
            {/* this is temporary until we can get the log in working */}
            <ProtectedRoute
              // shows AdminArtAdventure Page at all times (logged in or not)
              exact
              path="/admin/art-adventure"
            >
              <AdminArtAdventure />
            </ProtectedRoute>

            {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/user will show the UserPage if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
              Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <Route
              // logged in shows HomePage else shows LoginPage
              exact
              path="/home"
              
            >
              <HomePage distance={distance} userLat={userLat} userLng={userLng} />
            </Route>
              <Route
              exact
              path='/collection'>
                <Collection />
              </Route>
              <Route
              exact
              path='/collectionDetail/:id'>
                <CollectionDetail userLat={userLat} userLng={userLng}/>
              </Route>
            <Route
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
            >
              <InfoPage />
            </Route>

            {/* When a value is supplied for the authRedirect prop the user will
              be redirected to the path supplied when logged in, otherwise they will
              be taken to the component and path supplied. */}

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


            <Route
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              authRedirect="/user"
            >
              <LandingPage />
            </Route>

            {/* <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/admin/artist"
              // - else shows LandingPage at "/home" ***Need to change this to WELCOME ***
              exact
              path="/home"
              authRedirect="/admin/artist"
            >
              <AdminArtist />
            </ProtectedRoute> */}

            {/* If none of the other routes matched, we will show a 404. */}
            {/* <Route>
              <h1>404</h1>
            </Route> */}
          </Switch>
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
          <Route
            exact path='/sponsor/:id'
          >
            <SponsorDetail userLat={userLat} userLng={userLng}/>
          </Route>
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
