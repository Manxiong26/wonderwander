import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import HomePage from '../HomePage/HomePage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import MapView from '../MapView/MapView'
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import WelcomePage1 from '../WelcomePage/WelcomePage1';
import WelcomePage2 from '../WelcomePage/WelcomePage2';
import WelcomePage3 from '../WelcomePage/WelcomePage3';
import WelcomePage4 from '../WelcomePage/WelcomePage4';
import ArtworkDetail from '../ArtworkDetail/ArtworkDetail';

import SeePage from '../SeePage/SeePage';


import './App.css';

import Menu from '../Menu/Menu'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#DC0100'
      },
      secondary: {
        main: '#118ADA'
      }
    },
    typography: {
      fontFamily: [
        'pacifico',
        'lato',
        'lato-bold',
      ]
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Menu />
        <div>
          {/* <Nav /> */}
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

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
                <MapView />
            </Route>

            {/* This is where the collection detail is */}
            <Route
            exact
            // Add in id
            path="/artworkdetail/:id"
            >
              <ArtworkDetail />
            </Route>

            <Route
            // Add in id
            exact
            path="/see"
            >
              <SeePage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/user will show the UserPage if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
              Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <Route
              // logged in shows HomePage else shows LoginPage
              exact
              path="/home"
            >
              <HomePage />
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
        <Footer />
        </div>
        
      </Router>
    </ThemeProvider>
  );
}

export default App;
