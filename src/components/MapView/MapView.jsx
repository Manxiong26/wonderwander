import React from "react";
import Map from "../Map/Map";

const MapView = () => {
  // Map location parameters
  // to pass to Map component
  const center = {
    lat: 44.9681,
    lng: -93.2886,
  };

  return (
    <>
      <Map lat={center.lat} lng={center.lng} zoom={10} height={500} width={'90%'}/>
    </>
  );
};

export default MapView;
