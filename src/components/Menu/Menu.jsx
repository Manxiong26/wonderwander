import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

//material ui drawer
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from '@material-ui/core';

const drawerWidth = 240;

// email constant for the email function
const email = `shannon@wonderwander.art`

// when called, takes a text string in as an argument
// will take the user to their email, with the to: line filled with the email constant, and the subject pre-filled with the text passed in, based on which button clicked below
const goEmail = (text) => {
  window.location.href = `mailto:${email}?subject=${text}`;
}

// for styling
const styles = {
  sideNav: {
    marginTop: '-60px',
    zIndex: 3,
    marginLeft: '0px',
    position: 'fixed',
  },
  link: {
    color: 'black',
    textDecoration: 'none',
  }
};

//theme for styling elements
// also handles the transitioning of the elements in the menu 
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    fontFamily: theme.typography.Pacifico,
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),

    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));


function Menu() {
  const dispatch = useDispatch();
  const history = useHistory();

  // gets the user information from the store if they are logged in
  //this is to handle rendering the admin button to the DOM
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  // if the user is logged in, will take the user to the home page if they click on the login/logout button
  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  const classes = useStyles();
  const theme = useTheme();

  // local state to handle the opening and closing of the menu drawer
  const [open, setOpen] = React.useState(false);

  // if open, will set Open state to true
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  //if closed, will set Open state to false
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >

          {/* button to open the drawer */}
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Wonder Wander
            </Typography>
          </Toolbar>
        </AppBar>

        {/* handles rendering the drawer to the DOM */}
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {/* this is the arrow to close the drawer */}
          <div className={classes.drawerHeader}>

            {/* changes direction of arrow to open/close based on if the drawer is already open */}
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />

          {/* item that when clicked, will route user to the home page and close the drawer */}
          <Link to='/home' style={styles.link} onClick={handleDrawerClose}>
            <List>
              <ListItem button key={'Home'}>
                <ListItemText primary={'Home'} />
              </ListItem>
            </List>
          </Link>

          {/* item that when clicked, will route user to the map page and close the drawer */}
          <Link to='/map' style={styles.link} onClick={handleDrawerClose}>
            <List>
              <ListItem button key={'View Map/List'}>
                <ListItemText primary={'View Map/List'} />
              </ListItem>
            </List>
          </Link>

          {/* item that when clicked, will route user to the about page and close the drawer */}
          <Link to='/about' style={styles.link} onClick={handleDrawerClose}>
            <List>
              <ListItem button key={'About Us'}>
                <ListItemText primary={'About Us'} />
              </ListItem>
            </List>
          </Link>

          {/* item that when clicked, will call the goEmail function, passing in the string of text as an argument, and also close the drawer */}
          <List>
            <ListItem button onClick={function () { handleDrawerClose(); goEmail('Hello Wonder Wander!'); }} key={'Contact Wonder Wander'}>
              <ListItemText primary={'Contact Wonder Wander'} />
            </ListItem>
          </List>

          {/* item that when clicked, will call the goEmail function, passing in the string of text as an argument, and also close the drawer */}
          <List>
            <ListItem button onClick={function () { handleDrawerClose(); goEmail('Submit a Collection'); }} key={'Add an Art Collection'}>
              <ListItemText primary={'Add an Art Collection'} />
            </ListItem>
          </List>

          {/* item that when clicked, will call the goEmail function, passing in the string of text as an argument, and also close the drawer */}
          <List>
            <ListItem button onClick={function () { handleDrawerClose(); goEmail('Become a Sponsor'); }} key={'Become a Sponsor'}>
              <ListItemText primary={'Become a Sponsor'} />
            </ListItem>
          </List>

          {/* when clicked, will log the user out and redirect them to the login page */}
          <Link to='/login' style={styles.link} onClick={handleDrawerClose,
            () => dispatch({ type: 'LOGOUT' })}>

            {/* button to log in/log out, will also close drawer when clicked */}
            <List>
              <ListItem button key={'Sign In/Out'}>
                <ListItemText primary={'Sign In/Out'} onClick={handleDrawerClose} />
              </ListItem>
            </List>
          </Link>

          {/* if the user is logged in AND an admin, will show an admin button */}
          {/* when clicked, this button directs the user to the admin landing page */}
          {user.admin ?
            (
              <Link to='/admin/landing' style={styles.link} onClick={handleDrawerClose}>

                <List>
                  <ListItem button key={'Admin'}>
                    <ListItemText primary={'Admin'} />
                  </ListItem>
                </List>
              </Link>
            ) : (<></>)
          }
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
        </main>
      </div>
    </>
  )
}

export default Menu;