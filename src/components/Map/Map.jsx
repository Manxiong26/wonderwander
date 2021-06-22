import React from 'react';
import env from 'react-dotenv'
import {makeStyles} from '@material-ui/core'
import GoogleMapReact from 'google-map-react';
import './Map.css'


const useStyles = makeStyles((theme) => ({
    
}))

const Map = ({lat, lng, zoom}) => {
    
    const classes = useStyles();

    // Props values for map center and zoom
    let locationVars = {
        center: {
            lat: lat,
            lng: lng
        },
        zoom: zoom
    }

    


    return (
       
       <div className="map">
           <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
            defaultCenter={locationVars.center}
            defaultZoom={locationVars.zoom}
            >
                
            
            </GoogleMapReact>  

       </div> 
    )
}

export default Map

