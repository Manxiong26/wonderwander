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
        Box  
        } from "@material-ui/core";

function AdminArtwork() {

    let {id} = useParams();
    //console.log(id);

    //functionality to route to a page
    const history = useHistory();

    //functionality to dispatch information to a saga or reducer
    const dispatch = useDispatch();

    //redux store instances 
    const artworkList = useSelector((store) => store.adminArtworkListReducer);
    const artwork = useSelector((store) => store.adminArtworkInfoReducer);
    console.log('artwork reducer id:', artwork.id);

    //retrieves artworks' info from DB
    useEffect(() => {
        dispatch({ type: 'FETCH_ARTWORK_LIST' });
    }, []);

    //sets local state for post request
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [vid_link, setVidLink] = useState('');
    const [vid_description, setVidDescription] = useState('');
    const [artist_id, setArtistId] = useState('');
    const [sponsor_id, setSponsorId] = useState('');
    const [collection_id, setCollectionId] = useState('');

    //edit mode
    const [editMode, setEditMode] = useState(false);

    //post to saga
    const addArtwork = () => {
        
        //create object to send
        const newArtwork = {
            name: name,
            year: year,
            lat: lat,
            long: long,
            image: image,
            description: description,
            vid_link: vid_link,
            vid_description: vid_description,
            artist_id: artist_id,
            sponsor_id: sponsor_id,
            collection_id: collection_id,
        }
        
        //dispatch to artworkList saga
        dispatch({ type: 'ADD_ARTWORK', payload: newArtwork });
        
        //alert successful post
        swal({
            text: "This artwork has been added to your list!",
            icon: "success"
        });

        //updates artwork list on DOM
        dispatch({ type: 'FETCH_ARTWORK_LIST' });

        //clears input fields
        setName('');
        setYear('');
        setLat('');
        setLong('');
        setImage('');
        setDescription('');
        setVidLink('');
        setVidDescription('');
        setArtistId('');
        setSponsorId('');
        setCollectionId('');
    }

    //renders specific artwork's details in input feilds to edit
    const renderArtworkDetail = (event, item) => {
        console.log('clicking edit for Artwork = ', item);

        //sets specific artwork in artwork reducer 
        dispatch({type: 'SET_ARTWORK_INFO', payload: item}); // 

        //renders form view from add to edit mode
        setEditMode(true);
 
        //shows specific artwork's details in input fields for editing
        setName(item.name);
        setYear(item.year);
        setLat(item.lat);
        setLong(item.long);
        setImage(item.image);
        setDescription(item.description);
        setVidLink(item.vid_link);
        setVidDescription(item.vid_description);
        setArtistId(item.artist_id);
        setSponsorId(item.sponsor_id);
        setCollectionId(item.collection_id);
    }

    //update (edit) artwork information
    const updateArtworkInfo = () => {
        
        //create updated artwork object
        const updatedArtworkInfo = {
            id: artwork.id, 
            name: name,
            year: year,
            lat: lat,
            long: long,
            image: image,
            description: description,
            vid_link: vid_link,
            vid_description: vid_description,
            artist_id: artist_id,
            sponsor_id: sponsor_id,
            collection_id: collection_id,
        }

        console.log('updated artwork info:', updatedArtworkInfo);

        //send updated artwork info to artwork saga
        dispatch({type: 'UPDATE_ARTWORK_INFO', payload: updatedArtworkInfo});

        //swal success indicator
        swal({
            text: "This artwork's information has been updated!",
            icon: "success" 
        });

        //turn editMode off
        setEditMode(false);

        //clears input fields
        setName('');
        setYear('');
        setLat('');
        setLong('');
        setImage('');
        setDescription('');
        setVidLink('');
        setVidDescription('');
        setArtistId('');
        setSponsorId('');
        setCollectionId('');
    }

    //cancel (editMode) button - returns to add artwork form
    const renderToInfo = () => {
        setEditMode(false);

        //clears input fields
        setName('');
        setYear('');
        setLat('');
        setLong('');
        setImage('');
        setDescription('');
        setVidLink('');
        setVidDescription('');
        setArtistId('');
        setSponsorId('');
        setCollectionId('');
    }

    //delete artwork 
    const deleteArtwork = (id) => {
        console.log('deleting artwork:', id);
        
        //dispatch to saga w artwork id 
        dispatch({type: 'DELETE_ARTWORK', payload: id})
    }

    //alerts admin to verify artwork deletion
    const deleteValidation = (id) => {
        console.log('delete clicked! id = ', id);

        swal({
            title: "Hello!",
            text: "Are you sure you want to PERMANENTLY delete this artwork?",
            buttons: {
              cancel: true,
              confirm: "Delete"
            }
        }).then(val => {
          if(val) {
            swal({
              text: "You've deleted this artwork.",
            });
            deleteArtwork(id);
          }
        });
    }
  
    return (
      <div>
          
          {editMode ?
          <div>
              <Typography variant="h4">Edit Artwork</Typography>
              <form className="admin-form" onSubmit={updateArtworkInfo}>
                <TextField type="text"
                    placeholder="Artwork Title"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Year"
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                />
                <TextField type="number"
                    placeholder="Latitude"
                    value={lat}
                    onChange={(event) => setLat(event.target.value)}
                />
                <TextField type="number"
                    placeholder="Longitude"
                    value={long}
                    onChange={(event) => setLong(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Video URL"
                    value={vid_link}
                    onChange={(event) => setVidLink(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Video Description"
                    value={vid_description}
                    onChange={(event) => setVidDescription(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Artist"
                    value={artist_id}
                    onChange={(event) => setArtistId(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Sponsor"
                    value={sponsor_id}
                    onChange={(event) => setSponsorId(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Collection"
                    value={collection_id}
                    onChange={(event) => setCollectionId(event.target.value)}
                />
                <Button className="admin-btn" type="submit" name="submit" variant="outlined" value="Update">Update</Button>
                <Button className="admin-btn" variant="outlined" onClick={renderToInfo}>Cancel</Button>
              </form>
          </div>
          :    
          <div>
              <Typography variant="h4">Add Artwork</Typography>
              <form className="admin-form" onSubmit={addArtwork}>
                <TextField type="text"
                    placeholder="Artwork Title"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Year"
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                />
                <TextField type="number"
                    placeholder="Latitude"
                    value={lat}
                    onChange={(event) => setLat(event.target.value)}
                />
                <TextField type="number"
                    placeholder="Longitude"
                    value={long}
                    onChange={(event) => setLong(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Video URL"
                    value={vid_link}
                    onChange={(event) => setVidLink(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Video Description"
                    value={vid_description}
                    onChange={(event) => setVidDescription(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Artist"
                    value={artist_id}
                    onChange={(event) => setArtistId(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Sponsor"
                    value={sponsor_id}
                    onChange={(event) => setSponsorId(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Collection"
                    value={collection_id}
                    onChange={(event) => setCollectionId(event.target.value)}
                />
                <Button className="admin-btn" type="submit" name="submit" variant="outlined" value="Submit">Submit</Button>
              </form>
          </div>}
          
          {/* Artwork List. Always shows. */}
          {/* Edit clickability renders a specific artwork's details in the edit form */}
          <div>
              <Typography variant="h5">Artwork List</Typography>
            <List>
                {artworkList.map((item, i) =>
                    <div>
                    <ListItem key={i} > 
                        <ListItemAvatar>
                        <Typography variant="h6">
                            <img src={item.image} alt="Artwork Image" width="50" height="50" /> 
                            {item.name} 
                        </Typography>
                        </ListItemAvatar>
                        <Box m={.5}>
                            <Button className="admin-btn" variant="outlined" onClick={(event) => renderArtworkDetail(event, item)}>Edit</Button>
                        </Box> 
                        <Box m={.5}>  
                            <Button className="admin-btn" variant="outlined" onClick={() => deleteValidation(item.id)}>Delete</Button>
                        </Box>
                    </ListItem>
                    <Divider/>
                   </div>
                )}
            </List>
          </div>

      </div>
    );
}

export default AdminArtwork;