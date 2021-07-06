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
            <div className={classes.pageMargin}>
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
                {collectionDet[0] === undefined ?
                    (<Typography className={classes.center}>This collection does not contain any artwork.</Typography>) : (<>
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
                            <Button
                                className={classes.btn}
                                variant="outlined"
                                color="primary"
                                href={collectionDet[0].site_link}>Website</Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                href={collectionDet[0].donate_link}>$ Donate</Button>
                        </div>
                        {/* Need to change to Number for lat & long for map to show */}
                        <Map mapLat={Number(collectionDet[0].lat)} mapLng={Number(collectionDet[0].lng)} zoom={10}
                            reducer={collectionDet} height={300} width={'90%'} userLat={userLat} userLng={userLng} />
                        <Typography variant="h6" className={classes.redCenter}>
                            ArtWork
                        </Typography>
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
                    </>
                    )}
            </div>
        </>
    )
}

export default CollectionDetail;