import React, { useState } from "react";
import env from "react-dotenv";
import { makeStyles } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import "./Map.css";

const useStyles = makeStyles((theme) => ({}));

const Map = ({ lat, lng, zoom }) => {
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
      lat: lat,
      lng: lng,
    },
    zoom: zoom,
  };
  
  // TODO: take user to art detail on click
  const toArtDetail = () => {
    console.log("Balloon clicked!!");
  };

  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
        defaultCenter={locationVars.center}
        defaultZoom={locationVars.zoom}
      >
        <BalloonMarker lat={lat} lng={lng} text="Walker Art Center" />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
