import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Map from "../Map/Map";

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

    //get the details for the sponsor from the store
    const details = useSelector(store => store.sponsorDetails);

    // get the art for the sponsor from the store
    const sponsorArt = useSelector(store => store.sponsorArt);
    const dispatch = useDispatch();
    const history = useHistory();

    const classes = useStyles();

    // const for the center of the map
    const center = {
        lat: 44.9681,
        lng: -93.2886,
    };

    // function that takes the user to the artworkdetail page for the specific artwork, takes art as an argument
    const toArt = (event, art) => {
        event.preventDefault();
        history.push(`/artworkdetail/${art}`)
    };

    // for getting the id of the specific sponsor
    const { id } = useParams();

    // on page load, dispatches to the server to get the details for the specific sponsor and will get all the art for that specific sponsor
    useEffect(() => {
        dispatch({ type: 'FETCH_SPONSOR_DETAILS', payload: id })
    }, [])
    useEffect(() => {
        dispatch({ type: 'FETCH_SPONSOR_ART', payload: id })
    }, [])

    //for rendering the pages
    return (
        <>
            <Grid container direction="column">
                <Grid item xs={12} sm={12} lg={12}>
                    <div className={classes.pageMargin}>

                        {/* when clicked, takes user back to the previous page visited */}
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

                        {/* if there is no sponsor associated with the artwork, render this message */}
                        {details.id === undefined ? (<Typography className={classes.center}>There is no sponsor for this artwork.</Typography>) :
                            (<> <div>

                                {/* otherwise, render the below */}
                                <img className={classes.image} src={details.logo}></img>
                            </div>
                                <div className={classes.textBox}>
                                    <Typography variant="body1" className={classes.center}>
                                        {details.description}
                                    </Typography>
                                </div>
                                {details.site_link &&
                                    <div className={classes.center}>

                                        {/* button that takes the user to the website for the sponsor */}
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            href={details.site_link}>Visit Website</Button>
                                    </div>
                                }
                                <div>

                                    {/* renders the map to the DOM */}
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

                                        {/* maps through the sponsor art array and renders all the art to the DOM */}
                                        {sponsorArt.map((art, index) => {
                                            return (
                                                <>
                                                    <Divider />
                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar className={classes.thumbnail} src={art.image} />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={art.name}
                                                        />

                                                        {/* when clicked, will go to the details page for the specific art, passing it in as an argument to the function */}
                                                        <IconButton>
                                                            <ArrowForwardIosIcon
                                                                onClick={(event) => toArt(event, art.id)}

                                                            />
                                                        </IconButton>
                                                    </ListItem>
                                                    <Divider />
                                                </>
                                            )
                                        })}
                                    </List>
                                </div>
                            </>
                            )}
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default SponsorDetail;