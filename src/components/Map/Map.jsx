import React, { useState, useEffect } from "react";
import env from "react-dotenv";
import { makeStyles } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import "./Map.css";

const useStyles = makeStyles((theme) => ({
  map: {
    marginRight: "auto",
    marginLeft: "auto",
    border: "1px solid black",
  },
}));

const Map = ({ mapLat, mapLng, zoom, reducer, height, width, userLat, userLng, geoAvailable }) => {

  const classes = useStyles();

  const handleApiLoaded = (map, maps) => {
      
  }

  // Balloon marker
  const BalloonMarker = () => (
    <div className="mapMarker" onClick={toArtDetail}></div>
  );
  // User location marker
  const UserLocation = () => <div className="userMarker"></div>;

  // Props values for map
  // center and zoom
  let locationVars = {
    center: {
      lat: mapLat,
      lng: mapLng,
    },
    zoom: zoom,
  };

  // TODO: take user to art detail on click
  const toArtDetail = () => {
    console.log("Balloon clicked!!");
  };

  return (
        <div style={{ height: height, width: width }} className={classes.map}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
            defaultCenter={locationVars.center}
            defaultZoom={locationVars.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            {reducer.map((item, i) => (
              <BalloonMarker key={i} lat={item.lat} lng={item.long} />
            ))}
            {userLat !== null && userLng !== null ? (
            <UserLocation lat={userLat} lng={userLng} />
            ) : ('')}
          </GoogleMapReact>
        </div>
  );
};

export default Map;
