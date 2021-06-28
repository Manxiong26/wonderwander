import React, { useState, useEffect } from "react";
import env from "react-dotenv";
import {useStyles} from '../classes.js'
import GoogleMapReact from "google-map-react";
import "./Map.css";
import { useHistory } from "react-router-dom";

const Map = ({ mapLat, mapLng, zoom, reducer, height, width, userLat, userLng }) => {

  const classes = useStyles();
  const history = useHistory();
  const handleApiLoaded = (map, maps) => {
      console.log(maps.geometry.spherical)
  }

  // ROUTE to direct user to directions
//   onClick={() => location.href="https://www.google.com/maps/dir/?api=1&origin="+userLat+","+userLng+"&destination="+item.lat+","+item.long+"&dir_action=navigate"}></div>


  // Balloon marker
  const BalloonMarker = ({item}) => (
    <div className="mapMarker" onClick={() => toArtDetail(item)}></div>

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

  // takes user to art detail on click
  const toArtDetail = (item) => {
    history.push(`/artworkdetail/${item.id}`)
  };

  return (
        <div style={{ height: height, width: width }} id="map" className={classes.map}>
          <GoogleMapReact
            bootstrapURLKeys={{ 
                key: process.env.REACT_APP_GOOGLE_KEY,
                libraries: ['geometry'] }}
            defaultCenter={locationVars.center}
            defaultZoom={locationVars.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            {reducer.map((item, i) => (
              <BalloonMarker  item={item} key={i} lat={item.lat} lng={item.long} />
            ))}
            {userLat !== null && userLng !== null ? (
            <UserLocation lat={userLat} lng={userLng} />
            ) : ('')}
          </GoogleMapReact>
        </div>
  );
};

export default Map;
