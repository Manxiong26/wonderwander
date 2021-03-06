import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import "./HomePage.css";
import { useHistory, Link, useParams } from "react-router-dom";

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

  const history = useHistory();

  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();

  //initialize to the DOM
  useEffect(() => {

    dispatch({ type: "FETCH_RANDOM_ART" });
    dispatch({ type: "FETCH_THREE_COLLECTION" });
    dispatch({ type: 'FETCH_ADVENTURES' });
  }, []);

  //Adventure reducer
  const adventure = useSelector((store) => store.adventureReducer.adventureList);

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
    event.preventDefault();
    history.push(`/adventure/${advDet.id}`);
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
            <Typography variant="h4" className={classes.title}>
              Art of the Day
            </Typography>
            <p key={randomArt.id}>
              <img className={classes.image} src={randomArt.image} />
            </p>
            <Typography variant="body2" className={classes.imageInfo}>
              <b>{randomArt.name}</b> by {randomArt.artist_name}
            </Typography>
            <Typography variant="h6" className={classes.red}>
              Find Public Art:
              <Link to="/collection" className={classes.nextBtn}>
                Browse All
              </Link>
            </Typography>
            <div>
              <List>

                {/* makes through the collection list of three items and renders them to the DOM */}
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
                        <ListItemText />
                        <IconButton>

                          {/* when clicked, calls the viewCollectionDetail and passes in the specific collection as an argument */}
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

              {/* button that when clicked, calls the toEmail function */}
              <Button onClick={toEmail} variant="outlined">
                {" "}
                <MailOutlineIcon className="email" /> Get Weekly Wonder News
              </Button>
            </div>
            <div>
              <Typography variant="h6" className={classes.red}>
                Other Art Adventures:
              </Typography>
              <div style={{height: '200px', overflow: 'auto'}}>
              <List>

                {/* maps through other art adventure array and renders them to the dom */}
                {adventure.map((advDet, i) => {
                  return (
                    <>
                      <Divider />
                      <ListItem key={i}>
                        <ListItemAvatar>
                          <Avatar className={classes.thumbnail} src={advDet.image} />
                        </ListItemAvatar>
                        <ListItemText>{advDet.title}</ListItemText>

                        {/* when clicked, will call toAdventure function, passing in the advDet as an argument */}
                        <IconButton >
                          <ArrowForwardIosIcon
                            onClick={(event) => toAdventure(event, advDet)}
                            className={classes.nextBtn}
                          />
                        </IconButton>
                      </ListItem>
                    </>
                  )
                })}
                <Divider />
              </List>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default HomePage;

