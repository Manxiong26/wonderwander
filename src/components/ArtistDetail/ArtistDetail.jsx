import React from 'react';
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


    const artwork = [];

    const classes = useStyles();

    const toWebsite = () => {
        console.log('To website!!')
    }

    return(
        <>
        <div className={classes.name}>
        <Typography variant="h5">Artist Name Here!</Typography>
        <div>
            <img className={classes.pic} src="https://i.ytimg.com/vi/LguXG80DezY/maxresdefault.jpg"/>
        </div>
        <div>
           <Typography>A talented but tormented artist.</Typography>
        </div>
        <div>
            <Button onClick={toWebsite}>Website</Button>
        </div>
        <div>
            <Typography variant="h6">Art by...</Typography>
            <Divider />
            <List>
            {artwork.map((item, i) => {
                return(
                    <>
                    <ListItem key={i}>
                        <ListItemAvatar>
                            <Avatar variant="square" src={item.image}/>
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