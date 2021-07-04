import React from 'react';
import {
    ListItem,
    ListItemText,
    Grid,
    Divider,
    IconButton,
} from '@material-ui/core';
import { useStyles } from "../classes";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useHistory } from 'react-router-dom';

function CollectionLinks({ artItem, userLat, userLng }) {
    const history = useHistory();
    const classes = useStyles();
    console.log('In ArtworkLinks...', artItem);
    // ROUTE to direct user to directions

    return (
        <>
            <Grid container direction="column">
                <Grid item xs={12} sm={12} lg={12}>
                    <div className={classes.pageMargin}>
                        <ListItem>
                            <ListItemText
                                primary={'Artist'}
                            />
                            <IconButton>
                                <ArrowForwardIosIcon onClick={() => history.push(`/artist_detail/${artItem.artist_id}`)} />
                            </IconButton>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary={'Collection'}
                            />
                            <IconButton>
                                <ArrowForwardIosIcon onClick={() => history.push(`/collectionDetail/${artItem.collection_id}`)} />
                            </IconButton>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary={'Sponsor'}
                            />
                            <IconButton>
                                <ArrowForwardIosIcon onClick={() => history.push(`/sponsor/${artItem.sponsor_id}`)} />
                            </IconButton>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary={'Directions'}
                            />
                            <IconButton>
                                <ArrowForwardIosIcon onClick={() =>
                                    location.href = "https://www.google.com/maps/dir/?api=1&origin="
                                    + userLat + "," + userLng + "&destination=" + artItem.lat + "," + artItem.lng
                                    + "&dir_action=navigate"} />
                            </IconButton>
                        </ListItem>
                        <Divider />
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default CollectionLinks;