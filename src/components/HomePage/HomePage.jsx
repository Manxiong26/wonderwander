import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import "./HomePage.css";
import { useHistory, Link, useParams } from "react-router-dom";
//matierl UI
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Grid,
  Box,
  Button,
  Divider,
  Typography,
  IconButton,
} from "@material-ui/core";
import { useStyles } from "../classes";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
function HomePage() {
  //this pushes to the next page
  const history = useHistory();
  //this dispatch the saga
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();
  //initialize to the DOM
  useEffect(() => {
    dispatch({ type: "FETCH_RANDOM_ART" });
    dispatch({ type: "FETCH_THREE_COLLECTION" });
    dispatch({ type: 'FETCH_ADVENTURE_DETAIL', payload: id });
  }, []);
  //Adventure reducer
  const adventure = useSelector((store) => store.adventureReducer.adventureReducer);
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  //randomArt Store reducer
  const randomArt = useSelector((store) => store.randomArt);
  //collection Store reducer
  const collectionThreeList = useSelector((store) => store.collectionThree);
  // pushes to Collection Detail
  const viewCollectionDetail = (event, collDet) => {
    history.push(`/collectionDetail/${collDet.id}`);
  };
  // pushes to email enter
  const toEmail = () => {
    history.push("/email");
  };
  // pushes to adventure info page
  const toAdventure = (event, advDet) => {
    console.log('Adventure', advDet);
    event.preventDefault();
    history.push(`/adventure/${advDet.id}`);
    console.log('clicking to adventure');
  };
  // function to render collection location text
  const collectionText = (collection) => (
    <>
      {collection.city}, {collection.state}
    </>
  );
  return (
    <>
      <Grid container direction="column">
        <Grid item xs={12} sm={12} lg={12}>
          <div className={classes.pageMargin}>
            <Typography variant="h5" className={classes.title}>
              Art of the Day
            </Typography>
            <p key={randomArt.id}>
              <img className={classes.image} src={randomArt.image} />
            </p>
            <Typography variant="body2" className={classes.imageInfo}>
              "{randomArt.name}" by {randomArt.artist_name}
            </Typography>
            <h4>
              Find Local Art:
              <Link to="/collection" className={classes.nextBtn}>
                Browse All
              </Link>
            </h4>
            <div>
              <List>
                {collectionThreeList.map((collection, i) => {
                  return (
                    <>
                      <Divider />
                      <ListItem key={i}>
                        <ListItemAvatar>
                          <Avatar className={classes.thumbnail} src={collection.image} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={collection.name}
                          secondary={collectionText(collection)}
                        />
                        <ListItemText secondary="miles" />
                        <IconButton>
                          <ArrowForwardIosIcon
                            onClick={(event) =>
                              viewCollectionDetail(event, collection)
                            }
                            className={classes.nextBtn}
                          />
                        </IconButton>
                      </ListItem>
                    </>
                  );
                })}
                <Divider />
              </List>
            </div>
            <div className="weekly">
              <Button onClick={toEmail} variant="outlined">
                {" "}
                <MailOutlineIcon className="email" /> Get Weekly Wonder News
              </Button>
            </div>
            <div>
              <h4>Other Art Adventures:</h4>
              <List>
                {adventure.map((advDet, i) => {
                  return (
                    <>
                      <Divider />
                      <ListItem key={i}>
                        <ListItemText>{advDet.title}</ListItemText>
                        <IconButton >
                          <ArrowForwardIosIcon
                            onClick={(event) => toAdventure(event, advDet)}
                            className={classes.nextBtn}
                          />
                        </IconButton>
                      </ListItem>
                      <Divider />
                    </>
                  )
                })}
              </List>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
// this allows us to use <App /> in index.js
export default HomePage;

