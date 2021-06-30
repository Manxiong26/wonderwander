import React from 'react';
import { Grid, Paper, Card, CardMedia, CardContent, Typography, ListItemText} from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

function CollectionLinks({list, userLat, userLng, distance}) {
    const history = useHistory();
    console.log('In ArtworkLinks...', list);
    // ROUTE to direct user to directions

    return (
        <Card>
            <CardActionArea onClick={() => history.push(`/artist_detail/${list.artist_id}`)}>  
                <CardContent>
                    <Typography>
                        Artist
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActionArea onClick={() => history.push('/collection')}>
                <CardContent>
                    <Typography>
                        Collections
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActionArea onClick={() => history.push(`/sponsor/${list.sponsor_id}`)}>
                <CardContent>
                    <Typography>
                        Sponsor
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActionArea onClick={() => location.href="https://www.google.com/maps/dir/?api=1&origin="+userLat+","+userLng+"&destination="+list.lat+","+list.lng+"&dir_action=navigate"}>
                <CardContent>
                    <Typography>
                        Directions 
                        <ListItemText secondary={distance(
                          Number(list.lat),
                          Number(list.lng),
                          userLat,
                          userLng
                        )}>
                        </ListItemText>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default CollectionLinks;