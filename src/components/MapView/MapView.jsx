import React, { useState } from "react";
import Map from "../Map/Map";
import { makeStyles, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider  } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    marginTop: "auto",
    marginBottom: "auto",
  },
  view: {
    textAlign: 'center',
    border: '1px solid black'
  }
}));

const MapView = () => {
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
//   console.log(artwork);

  console.log()

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

  return (
    <>
      {!toggle ? (
        <div>
          <Typography className={classes.view} onClick={toggleViews}>List View</Typography>
          <div className={classes.mapContainer}>
            <Map
              mapLat={center.lat}
              mapLng={center.lng}
              zoom={10}
              height={500}
              width={"90%"}
              reducer={artwork}
            />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <Typography onClick={toggleViews}>Map View</Typography>
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
