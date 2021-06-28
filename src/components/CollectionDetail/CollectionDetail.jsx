import React, { useEffect } from 'react'
import { useHistory, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CollectionDetail.css'
import GoogleMapReact from "google-map-react";
import Map from '../Map/Map'

import { makeStyles } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


function CollectionDetail(){
   
    // const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
// collection detail reducer

    const collectionDet = useSelector(store => store.collectionDetail)
    console.log('CHECKING COLLECTDET STORE_____________',collectionDet);
    

// using id to grab detail 
    let { id } = useParams();

    //render on Dom 
    useEffect(() => {
       console.log('In useEffect param', id);
      dispatch({ type: 'FETCH_COLLECTION_DETAIL', payload: id })
      dispatch({type: 'FETCH_ART_DETAIL', payload: id})
    }, [])

const viewArtworkDetail = (event, artDet) => {  //artDet
console.log('HELLLLLLLLLLPPPPPPPPPPPP',artDet);    
     event.preventDefault();
    history.push(`/artworkdetail/${artDet}`) //artDet.id
    console.log('CLICKING');
}

    return(
        <>
        <div>
            <h1>Collection Detail</h1>
        </div>
        {collectionDet[0] === undefined ?
        ('') : ( <>
        <div className="center">
        <img className="logo3" src={collectionDet[0].collection_image}/>
        </div>
        <div className="center">
        <button><a className="web" href={collectionDet[0].site_link}>WebSite</a></button>
        <button><a className="web" href={collectionDet[0].donate_link}>$ Donate</a></button>
        </div>
        
        <div className="center">
            <p>Map Goes Here</p>
            {/* Need to change to Number for lat & long for map to show */}
    <Map  mapLat={Number(collectionDet[0].lat)} mapLng={Number(collectionDet[0].long)} zoom={10} 
    reducer={collectionDet} height={300} width={'90%'} />
        
        {/* <div style={{height: height, width: width}} className={classes.map}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
        defaultCenter={locationVars.center}
        defaultZoom={locationVars.zoom}
      >
        {collectionDet.map((item, i) => (
        <BalloonMarker key={i} lat={item.lat} lng={item.long}/>
    ))}
      </GoogleMapReact>
    </div> */}
   <div>
            <h3>ArtWork</h3>
        {/* <section>
        <ul>
            {collectionDet.map(collection => {
              return( <li key={collection.id}>{collection.artwork_name}</li>)
            })}
            </ul>
            </section> */}
        </div>
        <div className="collectionList">
            {collectionDet.map(artDet =>{
                
       return( <Box component="span" m={1} key={artDet.id}>
        <Divider/>
        <p className="logo"><img className="logo2" src={artDet.artwork_image}/> {artDet.artwork_name}
         <Link onClick={(event) => viewArtworkDetail(event, artDet.art_work_id)} className="arrow"> 
        <ArrowForwardIosIcon/> </Link></p>
      </Box >) })}
      <Divider/>
      </div>
      </div>
       </> )}
        </>

    )
}

export default CollectionDetail;