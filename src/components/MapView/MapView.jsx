import React, { useState } from "react";
import Map from "../Map/Map";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    marginTop: "auto",
    marginBottom: "auto",
  },
}));

const MapView = () => {
  const [toggle, setToggle] = useState(false);
  console.log(toggle);

  const classes = useStyles();
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
          <Typography onClick={toggleViews}>List View</Typography>
          <div className={classes.mapContainer}>
            <Map
              lat={center.lat}
              lng={center.lng}
              zoom={10}
              height={500}
              width={"90%"}
            />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <Typography onClick={toggleViews}>List View</Typography>
          </div>
        </div>
      )}
    </>
  );
};

export default MapView;
