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

const email = `shannon@wonderwander.art`
const goEmail = () => {
  window.location.href = `mailto:${email}`;
}

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
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toAdminRegister = () => {
    history.push('/admin/register')
  }

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
            {user.admin &&
              <Button variant="outlined" onClick={toAdminRegister}>
                <Typography style={{ color: 'white' }}>Add Admin</Typography>
              </Button>}
          </Toolbar>
        </AppBar>
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
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <Link to='/home' style={styles.link} onClick={handleDrawerClose}>
            <List>
              <ListItem button key={'Home'}>
                <ListItemText primary={'Home'} />
              </ListItem>
            </List>
          </Link>
          <Link to='/map' style={styles.link} onClick={handleDrawerClose}>
            <List>
              <ListItem button key={'View Map/List'}>
                <ListItemText primary={'View Map/List'} />
              </ListItem>
            </List>
          </Link>
          <Link to='/about' style={styles.link} onClick={handleDrawerClose}>
            <List>
              <ListItem button key={'About Us'}>
                <ListItemText primary={'About Us'} />
              </ListItem>
            </List>
          </Link>
          <List>
            <ListItem button onClick={function () { handleDrawerClose(); goEmail(); }} key={'Contact Wonder Wander'}>
              <ListItemText primary={'Contact Wonder Wander'} />
            </ListItem>
          </List>

          <List>
            <ListItem button onClick={function () { handleDrawerClose(); goEmail(); }} key={'Add an Art Collection'}>
              <ListItemText primary={'Add an Art Collection'} />
            </ListItem>
          </List>

          <List>
            <ListItem button onClick={function () { handleDrawerClose(); goEmail(); }} key={'Become a Sponsor'}>
              <ListItemText primary={'Become a Sponsor'} />
            </ListItem>
          </List>
          <Link to='/login' style={styles.link} onClick={handleDrawerClose,
            () => dispatch({ type: 'LOGOUT' })}>

            <List>
              <ListItem button key={'Sign In/Out'}>
                <ListItemText primary={'Sign In/Out'} onClick={handleDrawerClose} />
              </ListItem>
            </List>
          </Link>
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