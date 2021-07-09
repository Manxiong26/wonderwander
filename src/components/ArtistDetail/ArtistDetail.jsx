import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid,
} from "@material-ui/core";
import { useStyles } from "../classes";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useHistory } from "react-router-dom";

const ArtistDetail = () => {
  // Grabs id of specific artist from URL
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // Loads artist detail info
  useEffect(() => {
    dispatch({ type: "FETCH_ARTIST_DETAIL", payload: id });
  }, []);

  // artist detail reducer
  const artist = useSelector((store) => store.artistDetail);
  const artistInfo = artist[0];

  // function to handle clicking a specific artwork for this artist page, goes to the detail page for that artwork
  const toArtDetail = (item) => {
    history.push(`/artworkdetail/${item.art_id}`);
  };

  //for rendering the page to the DOM
  return (
    <>
      <Grid container direction="column">
        <Grid item xs={12} sm={12} lg={12}>
          <div className={classes.pageMargin}>

            {/* button that when clicked, goes back to the previous page  */}
            <Button
              onClick={() => {
                history.goBack();
              }}
            >
              <ArrowBackIosIcon />
            </Button>

            {/* check if the artistInfo is undefined, waits for all the information to be grabbed from the server before rendering everything to the DOM */}
            {artistInfo === undefined ? (<>
              <div>
                <Typography variant="h4" className={classes.title}>
                  Artist Detail
                </Typography>
              </div>
              <Typography className={classes.center}>Unknown Artist</Typography>
            </>) : (
              <div>
                <Typography className={classes.title} variant="h4">
                  {artistInfo.name}
                </Typography>
                {artistInfo.image && (
                  <div>
                    <img className={classes.bigImage} src={artistInfo.image} />
                  </div>
                )}
                {artistInfo.bio && (
                  <>
                    <Typography variant="h6" className={classes.title}>
                      Bio
                    </Typography>
                    <div className={classes.textBox}>
                      <Typography className={classes.center} variant="body1">
                        {artistInfo.bio}
                      </Typography>
                    </div>
                  </>
                )}
                {artistInfo.site_link && (
                  <div className={classes.center}>
                    <Button
                      variant="outlined"
                      color="primary"
                      href={artistInfo.site_link}
                    >
                      Artist Website
                    </Button>
                  </div>
                )}
                <div>
                  <Typography variant="h6" className={classes.redCenter}>
                    Art by {artistInfo.name}
                  </Typography>
                  <Divider />
                  <List>

                    {/* maps through the artist object brought back from the server and render it to the DOM*/}
                    {artist.map((item, i) => {
                      return (
                        <>
                          <ListItem key={i}>
                            <ListItemAvatar>
                              <Avatar src={item.art_pic} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={item.title}
                              secondary={item.name}
                            />
                            <ArrowForwardIosIcon
                              onClick={() => toArtDetail(item)}
                            />
                          </ListItem>
                          <Divider />
                        </>
                      );
                    })}
                  </List>
                </div>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ArtistDetail;
