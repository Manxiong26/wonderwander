import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Map from "../Map/Map";
import { useHistory } from 'react-router-dom';

//matierl UI
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Grid,
    Button,
    Divider,
    Typography,
    IconButton,
} from "@material-ui/core";
import { useStyles } from "../classes";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";




function SponsorDetail({ userLat, userLng }) {
    const details = useSelector(store => store.sponsorDetails);
    const sponsorArt = useSelector(store => store.sponsorArt);
    const dispatch = useDispatch();
    const history = useHistory();

    const classes = useStyles();

    const center = {
        lat: 44.9681,
        lng: -93.2886,
    };


    const toArt = (event, art) => {
        event.preventDefault();
        history.push(`/artworkdetail/${art.id}`)
    };

    const { id } = useParams();

    useEffect(() => {
        dispatch({ type: 'FETCH_SPONSOR_DETAILS', payload: id })
    }, [])
    useEffect(() => {
        dispatch({ type: 'FETCH_SPONSOR_ART', payload: id })
    }, [])
    

    return (
        <>
            <Grid container direction="column">
                <Grid item xs={12} sm={12} lg={12}>
                    <div className={classes.pageMargin}>
                        <Button
                            onClick={() => {
                                history.goBack();
                            }}
                        >
                            <ArrowBackIosIcon />
                        </Button>
                        <Typography variant="h4" className={classes.title}>
                            Sponsor Detail
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

                        <Typography variant="h6" className={classes.redCenter}>ArtWork</Typography>

                        <div>
                            <List>
                                {sponsorArt.map((art, index) => {
                                    return (
                                        <>
                                            <Divider />
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar className={classes.thumbnailLarge} src={art.image} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={art.name}
                                                />
                                                <IconButton>
                                                    <ArrowForwardIosIcon
                                                    //IAN THIS IS WHERE YOUR VIEW ARTWORKDETAIL BUTTON WILL GO 
                                                    // onClick={(event) => viewArtworkDetail(event, art.art_work_id)}
                                                    
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