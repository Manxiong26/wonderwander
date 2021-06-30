import React, { useEffect } from 'react'
import { useHistory, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CollectionDetail.css'
import GoogleMapReact from "google-map-react";
import Map from '../Map/Map'

//material UI
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Grid,
    Box,
    Button,
    Divider,
    Typography,
    IconButton,
} from "@material-ui/core";
import { useStyles } from "../classes";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


function CollectionDetail({ userLat, userLng }) {

    // const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    // collection detail reducer

    const collectionDet = useSelector(store => store.collectionDetail)
    console.log('CHECKING COLLECTDET STORE_____________', collectionDet);


    // using id to grab detail 
    let { id } = useParams();

    //render on Dom 
    useEffect(() => {
        console.log('In useEffect param', id);
        dispatch({ type: 'FETCH_COLLECTION_DETAIL', payload: id })
        dispatch({ type: 'FETCH_ART_DETAIL', payload: id })
    }, [])

    const viewArtworkDetail = (event, artDet) => {  //artDet
        console.log('HELLLLLLLLLLPPPPPPPPPPPP', artDet);
        event.preventDefault();
        history.push(`/artworkdetail/${artDet}`) //artDet.id
        console.log('CLICKING');
    }

    return (
        <>
            <Button
                onClick={() => {
                    history.goBack();
                }}
            >
                <ArrowBackIosIcon />
            </Button>
            <div className={classes.pageMargin}>
            <div>
                <Typography variant="h5" className={classes.title}>
                    Collection Detail
                </Typography>
            </div>
            {collectionDet[0] === undefined ?
                ('') : (<>
                    <div className="center">
                        <img className="logo3" src={collectionDet[0].collection_image} />
                    </div>
                    <div className="center">
                        <Button variant="outlined"><a className="web" href={collectionDet[0].site_link}>WebSite</a></Button>
                        <Button variant="outlined"><a className="web" href={collectionDet[0].donate_link}>$ Donate</a></Button>
                    </div>

                    <div className="center">
                        {/* Need to change to Number for lat & lng for map to show */}
                        <Map mapLat={Number(collectionDet[0].lat)} mapLng={Number(collectionDet[0].lng)} zoom={10}
                            reducer={collectionDet} height={300} width={'90%'} userLat={userLat} userLng={userLng} />

                        <div>
                            <h3>ArtWork</h3>
                        </div>
                        <div >
                            {collectionDet.map(artDet => {

                                return (
                                    <>
                                        <Divider />
                                        <ListItem key={artDet.id}>
                                            <ListItemAvatar>
                                                <Avatar className={classes.thumbnail} src={artDet.artwork_image} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={artDet.artwork_name}
                                            />
                                            <IconButton>
                                                <ArrowForwardIosIcon
                                                    onClick={(event) => viewArtworkDetail(event, artDet.art_work_id)}
                                                    className={classes.nextBtn}
                                                />
                                            </IconButton>
                                        </ListItem >
                                    </>
                                )
                            })}
                            <Divider />
                        </div>
                    </div>
                </>)}
            </div>
        </>
    )
}

export default CollectionDetail;