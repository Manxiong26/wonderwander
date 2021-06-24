import React, { useState } from "react";
import Map from "../Map/Map";
import { makeStyles, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Button  } from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import env from "react-dotenv";

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  toggle: {
    display: 'flex',
    justifyContent: 'flex-end',
  }
}));

const MapView = ({userLat, userLng}) => {

  useEffect(() => {
    dispatch({ type: "FETCH_ARTWORK" });
  }, []);

  const classes = useStyles();
  const dispatch = useDispatch();

  // --- LOCAL STATE -- //
  const [toggle, setToggle] = useState(false);
  //   console.log(toggle);

  // --- REDUCERS --- //
  const artwork = useSelector((store) => store.artworkReducer);
  console.log('List of artworks: ', artwork);

  function distance(lat1, lon1, lat2, lon2) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		const radlat1 = Math.PI * lat1/180;
		const radlat2 = Math.PI * lat2/180;
		const theta = lon1-lon2;
		const radtheta = Math.PI * theta/180;
		let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;

		let miles = dist.toFixed(1)
		return miles + ' miles away';
	}
}


  // Map location parameters
  // to pass to Map component
  const center = {
    lat: 44.9681,
    lng: -93.2886,
  };

  // toggles between list view and map view
  const toggleViews = () => {
    setToggle(!toggle);
  };

  const toDetail = (item) => {
      console.log('artwork ID = ', item.id)
  }

  return (
    <>
      {!toggle ? (
        <div>
        <div className={classes.toggle}>
          <Button onClick={toggleViews}>List View</Button>
        </div>
          <div className={classes.mapContainer}>
            <Map
              mapLat={center.lat}
              mapLng={center.lng}
              zoom={10}
              height={500}
              width={"90%"}
              reducer={artwork}
              userLat={userLat}
              userLng={userLng}
            />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div className={classes.toggle}>
                <Button className={classes.toggle} onClick={toggleViews}>Map View</Button>
            </div>
            <List>
            <Divider />
            {artwork.map((item, i) => {
                return(
                    <>
                    <ListItem key={i}>
                        <ListItemAvatar>
                            <Avatar variant="square" src={item.image}/>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={item.title}
                            secondary={item.name}
                            />
                        <ListItemText
                            secondary={distance(Number(item.lat), Number(item.long), userLat, userLng)}
                        />
                        <ArrowForwardIosIcon onClick={() => toDetail(item)}/>
                    </ListItem>
                    <Divider />
                    </>
                )
            })}
            </List>
          </div>
        </div>
      )}
    </>
  );
};

export default MapView;
