import React, {useEffect} from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {makeStyles, Typography, Button, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText, Card} from '@material-ui/core';
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useHistory } from 'react-router-dom';

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
    },
    bio: {
        width: '300px',
        maxHeight: '500px',
        marginRight: 'auto',
        marginLeft: 'auto',
        border: '1px solid black',
        marginBottom: '2%',
        padding: '2%'
    },
    btn: {
        margin: '4%'
    }
    
  }));



const ArtistDetail = () => {

    // Grabs id of specific artist from URL
    const {id} = useParams()
    console.log(id)


    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    // Loads artist detail info
    useEffect(() => {
    dispatch({ type: 'FETCH_ARTIST_DETAIL', payload: id })
    }, [])

    // artist detail reducer
    const artist = useSelector(store => store.artistDetail);
    const artistInfo = artist[0];
    // console.log('Artist Detail: ', artist)

    const toArtDetail = (item) => {
        history.push(`/artworkdetail/${item.art_id}`)
    }


    return(
        <>
        {artistInfo === undefined ? ('Loading...') : (
        <div className={classes.name}>
        <Typography variant="h5">{artistInfo.name}</Typography>
        <div>
            <img className={classes.pic} src={artistInfo.image}/>
        </div>
        <div className={classes.bio}>
           <Typography variant="body1">{artistInfo.bio}</Typography>
        </div>
        <div className={classes.btn}>
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
                        <ArrowForwardIosIcon onClick={() => toArtDetail(item)} />
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