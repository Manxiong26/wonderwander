import React, {useEffect} from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {makeStyles, Typography, Button, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    name: {
        textAlign: 'center',
    },
    pic: {
        width: '300px',
        maxHeight: '500px',
        marginRight: 'auto',
        marginLeft: 'auto',
        border: '1px solid black'
    }
    
  }));



const ArtistDetail = () => {
    const {id} = useParams()
    console.log(id)

    useEffect(() => {

    dispatch({ type: 'FETCH_ARTIST_DETAIL', payload: id })

    }, [])


    const artist = useSelector(store => store.artistDetail);
    console.log('Artist Detail: ', artist)

    const artwork = []

    const classes = useStyles();
    const dispatch = useDispatch();

    const toWebsite = () => {
        console.log(artist[0].site_link)
    }

    return(
        <>
        <div className={classes.name}>
        <Typography variant="h5">{artist[0].name}</Typography>
        <div>
            <img className={classes.pic} src={artist[0].image}/>
        </div>
        <div>
           <Typography>{artist[0].bio}</Typography>
        </div>
        <div>
            <Button onClick={toWebsite}>Website</Button>
        </div>
        <div>
            <Typography variant="h6">Art by {artist[0].name}</Typography>
            <Divider />
            <List>
            {artist.map((item, i) => {
                return(
                    <>
                    <ListItem key={i}>
                        <ListItemAvatar>
                            <Avatar variant="square" src={item.art_pic}/>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={item.title}
                            secondary={item.name}
                            />
                    </ListItem>
                    <Divider />
                    </>
                )
            })}
            </List>
        </div>
        </div>
        </>
    )
}

export default ArtistDetail