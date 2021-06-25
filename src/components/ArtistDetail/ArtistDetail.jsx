import React, {useEffect} from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {makeStyles, Typography, Button, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    name: {
        textAlign: 'center',
        fontFamily: theme.typography.fontFamily,
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

    // Grabs id of specific artist from URL
    const {id} = useParams()
    console.log(id)


    const classes = useStyles();
    const dispatch = useDispatch();
    // Loads artist detail info
    useEffect(() => {
    dispatch({ type: 'FETCH_ARTIST_DETAIL', payload: id })
    }, [])

    // artist detail reducer
    const artist = useSelector(store => store.artistDetail);
    const artistInfo = artist[0];
    // console.log('Artist Detail: ', artist)


    return(
        <>
        {artistInfo === undefined ? ('Loading...') : (
        <div className={classes.name}>
        <Typography variant="h5">{artistInfo.name}</Typography>
        <div>
            <img className={classes.pic} src={artistInfo.image}/>
        </div>
        <div>
           <Typography>{artistInfo.bio}</Typography>
        </div>
        <div>
            <Button variant="outlined"><a href={artistInfo.site_link}>Artist Website</a></Button>
        </div>
        <div>
            <Typography variant="h6">Art by {artistInfo.name}</Typography>
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
        )}
        </>
    )
}

export default ArtistDetail