import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {useParams} from 'react-router-dom';
import Map from "../Map/Map";

import { makeStyles } from "@material-ui/core";



function SponsorDetail({userLat, userLng}) {
    const details = useSelector(store => store.sponsorDetails);
    const sponsorArt = useSelector(store => store.sponsorArt);
    const dispatch = useDispatch();

    const useStyles = makeStyles((theme) => ({
        mapContainer: {
            marginTop: "auto",
            marginBottom: "auto",
        },
    }));

    const classes = useStyles();

    const center = {
        lat: 44.9681,
        lng: -93.2886,
    };


    const BalloonMarker = () => {
        <div className="mapMarker" onClick={toArt}></div>
    }

    const UserLocation = () => <div className="userMarker"></div>;

    const toArt = () => {
        console.log('Click');
    };



    const {id} = useParams();

    useEffect (() => {
        dispatch({type: 'FETCH_SPONSOR_DETAILS', payload: id})
    }, [])
    useEffect (() => {
        dispatch({type: 'FETCH_SPONSOR_ART', payload: id})
    }, [])

    return (
        <div>
            <img src={details.logo}></img>
            <button onClick={(event) => {
                event.preventDefault();
                window.location.href=`${details.site_link}`
            }}>Visit Website</button>

            <div className={classes.mapContainer}>
                <Map
                    mapLat={center.lat}
                    mapLng={center.lng}
                    zoom={10}
                    height={500}
                    width={"90%"}
                    reducer={sponsorArt}
                    userLat={userLat}
                    userLng={userLng}
                />
            </div>
            
            <Grid container spacing={2}>
                {sponsorArt.map((art, index) => {
                    return (
                    <Grid item>
                        <Card className="artCard">
                            <CardMedia>
                                <img src={art.image}></img>
                            </CardMedia>
                            <CardContent>
                                <p>{art.description}</p>
                            </CardContent>
                        </Card>
                    </Grid>
                    )
                })}   
            </Grid>
        </div>

    )
}

export default SponsorDetail;