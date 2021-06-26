import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useHistory, useParams } from 'react-router-dom';

import { Button, 
        Typography, 
        TextField, 
        List, 
        ListItem, 
        ListItemAvatar, 
        Avatar,
        Divider,
        Input,
        Box,
        Grid,
        Card,
        makeStyles  
        } from "@material-ui/core";

import { useStyles } from '../classes'

function AdminArtist() {

    let {id} = useParams();
    //console.log(id);

    const classes = useStyles()

    //functionality to route to a page
    const history = useHistory();

    //functionality to dispatch information to a saga or reducer
    const dispatch = useDispatch();

    //redux store instances 
    const artistList = useSelector((store) => store.adminArtistListReducer);
    const artist = useSelector((store) => store.adminArtistInfoReducer);
    console.log('artist reducer id:', artist.id);

    //retrieves artists' info from DB
    useEffect(() => {
        dispatch({ type: 'FETCH_ARTIST_LIST' });
    }, []);

    //sets local state for post request
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [bio, setBio] = useState('');
    const [site_link, setSiteLink] =useState('');

    //edit mode
    const [editMode, setEditMode] = useState(false);

    //post to saga
    const addArtist = () => {
        
        //create object to send
        const newArtist = {
            name: name,
            image: image,
            bio: bio,
            site_link: site_link,
        }
        
        //dispatch to artistList saga
        dispatch({ type: 'ADD_ARTIST', payload: newArtist });
        
        //alert successful post
        swal({
            text: "This artist has been added to your list!",
            icon: "success"
        });

        //updates artist list on DOM
        dispatch({ type: 'FETCH_ARTIST_LIST' });

        //clears input fields
        setName('');
        setImage('');
        setBio('');
        setSiteLink('');
    }

    //renders specific artist's details in input feilds to edit
    const renderArtistDetail = (event, item) => {
        console.log('clicking edit for Artist = ', item);

        //sets specific artist in artist reducer 
        dispatch({type: 'SET_ARTIST_INFO', payload: item});  

        //renders form view from add to edit mode
        setEditMode(true);
 
        //shows specific artist's details in input fields for editing
        setName(item.name);
        setImage(item.image);
        setBio(item.bio);
        setSiteLink(item.site_link);
    }

    //update (edit) artist information
    const updateArtistInfo = () => {
        
        //create updated artist object
        const updatedArtistInfo = {
            id: artist.id, 
            name: name,
            image: image,
            bio: bio,
            site_link: site_link,
        }

        console.log('updated artist info:', updatedArtistInfo);

        //send updated artist info to artist saga
        dispatch({type: 'UPDATE_ARTIST_INFO', payload: updatedArtistInfo});

        //swal success indicator
        swal({
            text: "This artist's information has been updated!",
            icon: "success" 
        });

        //turn editMode off
        setEditMode(false);

        //clears input fields
        setName('');
        setImage('');
        setBio('');
        setSiteLink('');
    }

    //cancel (editMode) button - returns to add artist form
    const renderToInfo = () => {
        setEditMode(false);

        //clears input fields
        setName('');
        setImage('');
        setBio('');
        setSiteLink('');
    }

    //delete artist 
    const deleteArtist = (id) => {
        console.log('deleting artist:', id);
        
        //dispatch to saga w artist id 
        dispatch({type: 'DELETE_ARTIST', payload: id})
    }

    //alerts admin to verify artist deletion
    const deleteValidation = (id) => {
        console.log('delete clicked! id = ', id);

        swal({
            title: "Hello!",
            text: "Are you sure you want to PERMANENTLY delete this artist?",
            buttons: {
              cancel: true,
              confirm: "Delete"
            }
        }).then(val => {
          if(val) {
            swal({
              text: "You've deleted this artist.",
            });
            deleteArtist(id);
          }
        });
    }

    //changes db boolean to true which "publishes" item on public facing pages
    const publish = (event, item) => {
        console.log('clicking publish for Artist = ', item);

        //sets specific artist in artist reducer 
        dispatch({type: 'SET_ARTIST_INFO', payload: item}); 

        //changes item boolean to true
        const publishedTrue = {
            id: item.id, 
            published: true,
        }
        
        //sends updated artist info (published boolean true) to artist saga
        dispatch({type: 'UPDATE_PUBLISH', payload: publishedTrue});

        //swal success indicator
        swal({
            text: "This artist's information has been published!",
            icon: "success" 
        });
    }

    return (
      <Grid container spacing={2} direction="row" justify="space-around">
          
          {editMode ?
          
              <Grid item lg={4} className={classes.grid}>
                  <Card className={classes.card}>
                    <div className={classes.cardContent}>
              <Typography variant="h4">Edit Artist</Typography>

              <form className={classes.form} onSubmit={updateArtistInfo}>
                <TextField type="text"
                    placeholder="Artist Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Website URL"
                    value={site_link}
                    onChange={(event) => setSiteLink(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Artist Bio"
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                />
                <Button className="admin-btn" type="submit" name="submit" variant="outlined" value="Update">Update</Button>
                <Button className="admin-btn" variant="outlined" onClick={renderToInfo}>Cancel</Button>
              </form>
              </div>
              </Card>
              </Grid>
          
          :    
              <Grid item lg={4} className={classes.grid}>
                  <Card className={classes.card}>
                      <div className={classes.cardContent}>
              <Typography variant="h4">Add Artist</Typography>
              <form className={classes.form} onSubmit={addArtist}>
                <TextField type="text"
                    className={classes.inputs}
                    placeholder="Artist Name"
                    label="Artist Name"
                    variant="outlined"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <TextField type="text"
                className={classes.inputs}
                    placeholder="Image URL"
                    label="Image URL"
                    variant="outlined"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                />
                <TextField type="text"
                className={classes.inputs}
                    placeholder="Website URL"
                    label="Website URL"
                    variant="outlined"
                    value={site_link}
                    onChange={(event) => setSiteLink(event.target.value)}
                />
                <TextField type="text"
                className={classes.inputs}
                    placeholder="Artist Bio"
                    variant="outlined"
                    label="Artist Bio"
                    multiline
                    rows={6}
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                />
                <Button className={classes.formBtn} type="submit" name="submit" variant="outlined" value="Submit">Submit</Button>
              </form>
              </div>
              </Card>
              </Grid>}
          
          {/* Artist List. Always shows. */}
          {/* Edit clickability renders a specific artist's details in the edit form */}
         
          <Grid item lg={8}>
              <Card>
              <Typography variant="h5">Artist List</Typography>
            <List>
                {artistList.map((item, i) =>
                    <div>
                    <ListItem key={i} > 
                        <ListItemAvatar>
                        <Typography variant="h6">
                            <img src={item.image} alt="Artist Image" width="50" height="50" /> 
                            {item.name} 
                        </Typography>
                        </ListItemAvatar>
                        <Box m={.5}>
                            <Button className="admin-btn" variant="outlined" onClick={(event) => publish(event, item)}>Publish</Button>
                        </Box>
                        <Box m={.5}>
                            <Button className="admin-btn" variant="outlined" onClick={(event) => renderArtistDetail(event, item)}>Edit</Button>
                        </Box> 
                        <Box m={.5}>  
                            <Button className="admin-btn" variant="outlined" onClick={() => deleteValidation(item.id)}>Delete</Button>
                        </Box>
                    </ListItem>
                    <Divider/>
                   </div>
                )}
            </List>
            </Card>
            </Grid>

      </Grid>
    );
}

export default AdminArtist;