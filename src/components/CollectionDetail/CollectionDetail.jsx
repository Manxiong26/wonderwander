import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CollectionDetail.css'
import Map from '../Map/Map'

//material UI
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
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
    const center = {
        lat: 44.9681,
        lng: -93.2886,
    };

    const collectionDet = useSelector(store => store.collectionDetail)
    console.log('CHECKING COLLECTDET STORE_____________', collectionDet);

    // function that when called, takes the user to the artwork detail page with a specific piece of artwork, artDet, as an argument
    const viewArtworkDetail = (event, artDet) => {  //artDet
        event.preventDefault();
        history.push(`/artworkdetail/${artDet}`) //artDet.id
    }

    // using id to grab detail 
    const { id } = useParams();

    //when page loads, make dispatch to server with the id as a payload
    useEffect(() => {
        dispatch({ type: 'FETCH_COLLECTION_DETAIL', payload: id })
        dispatch({ type: 'FETCH_ART_DETAIL', payload: id })
    }, [])

    return (
        <>
            <div className={classes.pageMargin}>

                {/* button that when clicked takes the user back to the previous page */}
                <Button
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    <ArrowBackIosIcon />
                </Button>
                <div>
                    <Typography variant="h4" className={classes.title}>
                        Collection Detail
                    </Typography>
                </div>

                {/* if the collectionDet is undefined, as in there is nothing in the collection, render the message that there is nothing there */}
                {collectionDet[0] === undefined ?
                    (<Typography className={classes.center}>This collection does not contain any artwork.</Typography>) : (<>

                    {/* otherwise, render the artwork in the collection */}
                        <div >
                            <img className={classes.image} src={collectionDet[0].collection_image} />
                        </div>
                        <Typography variant="body1" className={classes.center}>
                        <b>{collectionDet[0].city}, {collectionDet[0].state}</b>
                        </Typography>
                        <Typography variant="h6" className={classes.title}>Bio</Typography>
                        <Divider/>
                        <div className={classes.textBox}>
                        <Typography variant="body1" className={classes.center}>
                        {collectionDet[0].bio}
                        </Typography>
                        </div>
                        <Divider/>
                        <div className={classes.center}>

                            {/* button that takes user to the website for the collection when clicked */}
                            <Button
                                className={classes.btn}
                                variant="outlined"
                                color="primary"
                                href={collectionDet[0].site_link}>Website</Button>

                            {/* button that takes the user to the donation link for the collection when clicked */}
                            <Button
                                variant="outlined"
                                color="primary"
                                href={collectionDet[0].donate_link}>$ Donate</Button>
                        </div>
            
                        {/* renders the google maps to the DOM */}
                        <Map 
                        mapLat={center.lat}
                        mapLng={center.lng}
                        zoom={10}
                        reducer={collectionDet} 
                        height={300} 
                        width={'90%'} 
                        userLat={userLat} 
                        userLng={userLng} />
                        <Typography variant="h6" className={classes.redCenter}>
                            ArtWork
                        </Typography>

                        {/* if the art_work_id is null, render that nothing is in the collection */}
                        {collectionDet[0].id === null ? ( <Typography className={classes.center}>This collection does not contain any artwork.</Typography>) :
                        (
                        <div >

                            {/* map through the collectionDet and render everything in it to the DOM */}
                            {collectionDet.map(artDet => {
                                return (
                                    <>
                                        <Divider />
                                        <ListItem >
                                            <ListItemAvatar>
                                                <Avatar className={classes.thumbnail} src={artDet.artwork_image} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={artDet.artwork_name}
                                            />

                                            {/* button that when clicked, calls the viewArtworkDetail function and passes the specific artwork into the function*/}
                                            <IconButton>
                                                <ArrowForwardIosIcon
                                                    onClick={(event) => viewArtworkDetail(event, artDet.id)}
                                                    className={classes.nextBtn}
                                                />
                                            </IconButton>
                                        </ListItem >
                                    </>
                                )
                            })}
                            <Divider />
                        </div>
                        )}
                    </>
                    )}
            </div>
        </>
    )
}

export default CollectionDetail;