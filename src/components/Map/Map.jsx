import React, { useState } from "react";
import env from "react-dotenv";
import { makeStyles } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import "./Map.css";

const useStyles = makeStyles((theme) => ({
    map: {
        marginRight: 'auto',
        marginLeft: 'auto',
        border: '1px solid black',
        }
}));

const Map = ({ mapLat, mapLng, zoom, reducer, height, width }) => {
  const classes = useStyles();

  // --IDEA: May need to map this component with the values
  // of the artwork locations once server route and reducer is set up.
  const BalloonMarker = () => (
    <div className="mapMarker" onClick={toArtDetail}></div>
  );

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
    <div style={{height: height, width: width}} className={classes.map}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
        defaultCenter={locationVars.center}
        defaultZoom={locationVars.zoom}
      >
        {reducer.map((item, i) => (
        <BalloonMarker key={i} lat={item.lat} lng={item.long}/>
    ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
