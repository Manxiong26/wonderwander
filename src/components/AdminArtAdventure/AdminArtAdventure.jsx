import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useHistory, useParams } from 'react-router-dom';
import AdminNav from '../AdminNav/AdminNav'

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

function AdminArtAdventure() {

    let {id} = useParams();
    //console.log(id);

    //functionality to route to a page
    const history = useHistory();

    //functionality to dispatch information to a saga or reducer
    const dispatch = useDispatch();

    //redux store instances 
    const artAdventureList = useSelector((store) => store.adminArtAdventureListReducer);
    const artAdventure = useSelector((store) => store.adminArtAdventureInfoReducer);
    console.log('artAdventure reducer id:', artAdventure.id);

    //retrieves art adventures' info from DB
    useEffect(() => {
        dispatch({ type: 'FETCH_ADVENTURE_LIST' });
    }, []);

    //sets local state for post request
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    //edit mode
    const [editMode, setEditMode] = useState(false);

    //post to saga
    const addArtAdventure = () => {
        
        //create object to send
        const newArtAdventure = {
            title: title,
            description: description,
            image: image,
        }
        
        //dispatch to artAdventureList saga
        dispatch({ type: 'ADD_ADVENTURE', payload: newArtAdventure });
        
        //alert successful post
        swal({
            text: "This art adventure has been added to your list!",
            icon: "success"
        });

        //updates art adventure list on DOM
        dispatch({ type: 'FETCH_ADVENTURE_LIST' });

        //clears input fields
        setTitle('');
        setDescription('');
        setImage('');
    }

    //renders a specific art adventure's details in input feilds to edit
    const renderArtAdventureDetail = (event, item) => {
        console.log('clicking edit for Art Adventure = ', item);

        //sets specific art adventure in art adventure reducer 
        dispatch({type: 'SET_ADVENTURE_INFO', payload: item}); // 

        //renders form view from add to edit mode
        setEditMode(true);
 
        //shows specific art adventure's details in input fields for editing
        setTitle(item.title);
        setDescription(item.description);
        setImage(item.image);
    }

    //update (edit) art adventure information
    const updateArtAdventureInfo = () => {
        
        //create updated art adventure object
        const updatedArtAdventureInfo = {
            id: artAdventure.id, 
            title: title,
            description: description,
            image: image,
        }

        console.log('updated art adventure info:', updatedArtAdventureInfo);

        //send updated art adventure info to art adventure saga
        dispatch({type: 'UPDATE_ADVENTURE_INFO', payload: updatedArtAdventureInfo});

        //swal success indicator
        swal({
            text: "This art adventure's information has been updated!",
            icon: "success" 
        });

        //turn editMode off
        setEditMode(false);

        //clears input fields
        setTitle('');
        setDescription('');
        setImage('');
    }

    //cancel (editMode) button - returns to add art adventure form
    const renderToInfo = () => {
        setEditMode(false);

        //clears input fields
        setTitle('');
        setDescription('');
        setImage('');
    }

    //delete art adventure 
    const deleteArtAdventure = (id) => {
        console.log('deleting art adventure:', id);
        
        //dispatch to saga w art adventure id 
        dispatch({type: 'DELETE_ADVENTURE', payload: id})
    }

    //alerts admin to verify artist deletion
    const deleteValidation = (id) => {
        console.log('delete clicked! id = ', id);

        swal({
            title: "Hello!",
            text: "Are you sure you want to PERMANENTLY delete this adventure?",
            buttons: {
              cancel: true,
              confirm: "Delete"
            }
        }).then(val => {
          if(val) {
            swal({
              text: "You've deleted this adventure.",
            });
            deleteArtAdventure(id);
          }
        });
    }
  
    return (        
      <div>
      <AdminNav />
          {editMode ?
          <div>
              <Typography variant="h4">Edit Adventure</Typography>
              <form className="admin-form" onSubmit={updateArtAdventureInfo}>
                <TextField type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                />
                <Button className="admin-btn" type="submit" name="submit" variant="outlined" value="Update">Update</Button>
                <Button className="admin-btn" variant="outlined" onClick={renderToInfo}>Cancel</Button>
              </form>
          </div>
          :    
          <div>
              <Typography variant="h4">Add Adventure</Typography>
              <form className="admin-form" onSubmit={addArtAdventure}>
                <TextField type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                />
                <Button className="admin-btn" type="submit" name="submit" variant="outlined" value="Submit">Submit</Button>
              </form>
          </div>}
          
          {/* Adventure List. Always shows. */}
          {/* Edit clickability renders a specific art adventure's details in the edit form */}
          <div>
              <Typography variant="h5">Adventure List</Typography>
            <List>
                {artAdventureList.map((item, i) =>
                    <div>
                    <ListItem key={i} > 
                        <ListItemAvatar>
                        <Typography variant="h6">
                            <img src={item.image} alt="Adventure Image" width="50" height="50" /> 
                            {item.title} 
                        </Typography>
                        </ListItemAvatar>
                        <Box m={.5}>
                            <Button className="admin-btn" variant="outlined" onClick={(event) => renderArtAdventureDetail(event, item)}>Edit</Button>
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

export default AdminArtAdventure;