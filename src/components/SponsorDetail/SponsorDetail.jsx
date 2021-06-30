import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { useHistory, useParams} from 'react-router-dom';
import Map from "../Map/Map";

//matierl UI
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
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { makeStyles } from "@material-ui/core";



function SponsorDetail({userLat, userLng}) {
    const details = useSelector(store => store.sponsorDetails);
    const sponsorArt = useSelector(store => store.sponsorArt);
    const dispatch = useDispatch();
    const history = useHistory();

    // const useStyles = makeStyles((theme) => ({
    //     mapContainer: {
    //         marginTop: "auto",
    //         marginBottom: "auto",
    //     },
    // }));

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
        <>
        <Button
                onClick={() => {
                    history.goBack();
                }}
            >
                <ArrowBackIosIcon />
            </Button>
        <Grid container direction="column">
        <Grid item xs={12} sm={12} lg={12}>
          <div className={classes.pageMargin}>
            <Typography variant="h5" className={classes.title}>
              Art of the Day
            </Typography>
        
            <img className={classes.image} src={details.logo}></img>
            <div className={classes.center}>
            <Button 
            variant="outlined" 
            color="primary"
            href={details.site_link}>Visit Website</Button>
        </div>
            <div>
                <Map
                    mapLat={center.lat}
                    mapLng={center.lng}
                    zoom={10}
                    height={300}
                    width={"90%"}
                    reducer={sponsorArt}
                    userLat={userLat}
                    userLng={userLng}
                />
            </div>
            <div>ArtWork</div>
            <div>
            <List>
                {sponsorArt.map((art, index) => {
                    return (
                        <>
                    <Divider />
                    <ListItem>
                        <ListItemAvatar>
                                <Avatar className={classes.thumbnailLarge} src={art.image}/>
                        </ListItemAvatar>
                        <ListItemText
                          primary={art.name}
                        />
                        <IconButton>
                          <ArrowForwardIosIcon
                //IAN THIS IS WHERE YOUR VIEW ARTWORKDETAIL BUTTON WILL GO 
                            // onClick={(event) =>
                            //   viewCollectionDetail(event, artwork)
                            // }
                            // className={classes.nextBtn}
                          />
                        </IconButton>
                    </ListItem>
                    <Divider />
                  </>
                    )
                })}   
            </List>
            </div>
        </div>
</Grid>
</Grid>
</>
    )
}

export default SponsorDetail;