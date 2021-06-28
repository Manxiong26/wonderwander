import React from 'react';
import { Grid, Paper, Card, CardMedia, CardContent, Typography, } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

function CollectionLinks({list}) {
    const history = useHistory();

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
        </Card>
    );
}

export default CollectionLinks;