import React, { useState } from "react";
import Map from "../Map/Map";
import {useStyles} from '../classes'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
  IconButton,
} from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import MapIcon from "@material-ui/icons/Map";
import ListIcon from "@material-ui/icons/List";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import env from "react-dotenv";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'


// const useStyles = makeStyles((theme) => ({
//   mapContainer: {
//     marginTop: "auto",
//     marginBottom: "auto",
//   },
//   toggle: {
//     display: "flex",
//     justifyContent: "flex-end",
//     marginRight: "5%",
//     marginBottom: "1%",
//   },
//   thumbnail: {
//     width: '60px',
//     height: '60px',
//     marginRight: 10,
//     border: "1px solid black"
//   }
// }));

const MapView = ({ userLat, userLng }) => {
  useEffect(() => {
    dispatch({ type: "FETCH_ARTWORK" })
    ;
  }, []);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // --- LOCAL STATE -- //
  const [toggle, setToggle] = useState(true);
  const [alignment, setAlignment] = useState("left");

  // --- REDUCERS --- //
  const artwork = useSelector((store) => store.artworkReducer);
//   console.log("List of artworks: ", artwork);

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
      return miles + " mi";
    }
  }

  // Map location parameters
  // to pass to Map component
  const center = {
    lat: 44.9681,
    lng: -93.2886,
  };

  // pushes user to art detail page
  const toArtDetail = (item) => {
    history.push(`/artworkdetail/${item.id}`)
  };
  // Swaps map/list icon highlight
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <>
    <div className={classes.pageMargin}>
    <Button
    onClick={() => {
        history.goBack();
    }}
>
    <ArrowBackIosIcon />
</Button>
</div>
    <div className={classes.pageMargin}>

      <ToggleButtonGroup
        exclusive
        className={classes.toggle}
        value={alignment}
        onChange={handleAlignment}
      >
        <ToggleButton
          value="left"
          variant="outlined"
          onClick={() => setToggle(true)}
        >
          <MapIcon />
        </ToggleButton>
        <ToggleButton
          value="right"
          variant="outlined"
          onClick={() => setToggle(false)}
        >
          <ListIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      {toggle ? (
        <div>
          <div className={classes.mapContainer}>
            <Map
              mapLat={center.lat}
              mapLng={center.lng}
              zoom={10}
              height={500}
              width={"100%"}
              reducer={artwork}
              userLat={userLat}
              userLng={userLng}
              
            />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <List>
              <Divider />
              {artwork.map((item, i) => {
                return (
                  <>
                    <ListItem key={i}>
                      <ListItemAvatar>
                        <Avatar className={classes.thumbnail} variant="square" src={item.image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        secondary={item.name}
                      />
                      <ListItemText
                        align="right"
                        secondary={distance(
                          Number(item.lat),
                          Number(item.lng),
                          userLat,
                          userLng
                        )}
                      />
                      <IconButton>
                      <ArrowForwardIosIcon className={classes.nextBtn} onClick={() => toArtDetail(item)} />
                      </IconButton>
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
    </>
  );
};

export default MapView;
