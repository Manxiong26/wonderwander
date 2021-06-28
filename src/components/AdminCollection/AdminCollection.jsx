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

function AdminCollection() {

    let {id} = useParams();
    //console.log(id);

    //functionality to route to a page
    const history = useHistory();

    //functionality to dispatch information to a saga or reducer
    const dispatch = useDispatch();

    //redux store instances 
    const collectionList = useSelector((store) => store.adminCollectionListReducer);
    const collection = useSelector((store) => store.adminCollectionInfoReducer);
    console.log('collection reducer id:', collection.id);

    //retrieves collections' info from DB
    useEffect(() => {
        dispatch({ type: 'FETCH_COLLECTION_LIST' });
    }, []);

    //sets local state for post request
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [bio, setBio] = useState('');
    const [donate_link, setDonateLink] = useState('');
    const [site_link, setSiteLink] = useState('');
    const [search_text, setSearchText] = useState('');

    //edit mode
    const [editMode, setEditMode] = useState(false);

    //post to saga
    const addCollection = () => {
        
        //create object to send
        const newCollection = {
            name: name,
            image: image,
            city: city,
            state: state,
            bio: bio,
            donate_link: donate_link,
            site_link: site_link,
            search_text: search_text,
        }
        
        //dispatch to collectionList saga
        dispatch({ type: 'ADD_COLLECTION', payload: newCollection });
        
        //alert successful post
        swal({
            text: "This collection has been added to your list!",
            icon: "success"
        });

        //updates collection list on DOM
        dispatch({ type: 'FETCH_COLLECTION_LIST' });

        //clears input fields
        setName('');
        setImage('');
        setCity('');
        setState('');
        setBio('');
        setDonateLink('');
        setSiteLink('');
        setSearchText('');
    }

    //renders specific collections's details in input feilds to edit
    const renderCollectionDetail = (event, item) => {
        console.log('clicking edit for Collection = ', item);

        //sets specific collection in artist reducer 
        dispatch({type: 'SET_COLLECTION_INFO', payload: item}); // 

        //renders form view from add to edit mode
        setEditMode(true);
 
        //shows specific collection's details in input fields for editing
        setName(item.name);
        setImage(item.image);
        setCity(item.city);
        setState(item.state);
        setBio(item.bio);
        setDonateLink(item.donate_link);
        setSiteLink(item.site_link);
        setSearchText(item.search_text);
    }

    //update (edit) collection information
    const updateCollectionInfo = () => {
        
        //create updated collection object
        const updatedCollectionInfo = {
            id: collection.id, 
            name: name,
            image: image,
            city: city,
            state: state,
            bio: bio,
            donate_link: donate_link,
            site_link: site_link,
            search_text: search_text,
        }

        console.log('updated collection info:', updatedCollectionInfo);

        //send updated collection info to collection saga
        dispatch({type: 'UPDATE_COLLECTION_INFO', payload: updatedCollectionInfo});

        //swal success indicator
        swal({
            text: "This Collection's information has been updated!",
            icon: "success" 
        });

        //turn editMode off
        setEditMode(false);

        //clears input fields
        setName('');
        setImage('');
        setCity('');
        setState('');
        setBio('');
        setDonateLink('');
        setSiteLink('');
        setSearchText('');
    }

    //cancel (editMode) button - returns to add collection form
    const renderToInfo = () => {
        setEditMode(false);

        //clears input fields
        setName('');
        setImage('');
        setCity('');
        setState('');
        setBio('');
        setDonateLink('');
        setSiteLink('');
        setSearchText('');
    }

    //delete collection 
    const deleteCollection = (id) => {
        console.log('deleting collection:', id);
        
        //dispatch to saga w collection id 
        dispatch({type: 'DELETE_COLLECTION', payload: id})
    }

    //alerts admin to verify collection deletion
    const deleteValidation = (id) => {
        console.log('delete clicked! id = ', id);

        swal({
            title: "Hello!",
            text: "Are you sure you want to PERMANENTLY delete this collection?",
            buttons: {
              cancel: true,
              confirm: "Delete"
            }
        }).then(val => {
          if(val) {
            swal({
              text: "You've deleted this collection.",
            });
            deleteCollection(id);
          }
        });
    }
  
    return (
      <div>
          <AdminNav/>
          
          {editMode ?
          <div>
              <Typography variant="h4">Edit Collection</Typography>
              <form className="admin-form" onSubmit={updateCollectionInfo}>
                <TextField type="text"
                    placeholder="Collection Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                />
                <TextField type="text"
                    placeholder="City"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                />
                <TextField type="text"
                    placeholder="State"
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Collection Bio"
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Donation URL"
                    value={donate_link}
                    onChange={(event) => setDonateLink(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Website URL"
                    value={site_link}
                    onChange={(event) => setSiteLink(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Search Text"
                    value={search_text}
                    onChange={(event) => setSearchText(event.target.value)}
                />
                <Button className="admin-btn" type="submit" name="submit" variant="outlined" value="Update">Update</Button>
                <Button className="admin-btn" variant="outlined" onClick={renderToInfo}>Cancel</Button>
              </form>
          </div>
          :    
          <div>
              <Typography variant="h4">Add Collection</Typography>
              <form className="admin-form" onSubmit={addCollection}>
                <TextField type="text"
                    placeholder="Collection Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                />
                <TextField type="text"
                    placeholder="City"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                />
                <TextField type="text"
                    placeholder="State"
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Collection Bio"
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Donation URL"
                    value={donate_link}
                    onChange={(event) => setDonateLink(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Website URL"
                    value={site_link}
                    onChange={(event) => setSiteLink(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Search Text"
                    value={search_text}
                    onChange={(event) => setSearchText(event.target.value)}
                />
                <Button className="admin-btn" type="submit" name="submit" variant="outlined" value="Submit">Submit</Button>
              </form>
          </div>}
          
          {/* Collection List. Always shows. */}
          {/* Edit clickability renders a specific collections's details in the edit form */}
          <div>
              <Typography variant="h5">Collection List</Typography>
            <List>
                {collectionList.map((item, i) =>
                    <div>
                    <ListItem key={i} > 
                        <ListItemAvatar>
                        <Typography variant="h6">
                            <img src={item.image} alt="Collection Image" width="50" height="50" /> 
                            {item.name} 
                        </Typography>
                        </ListItemAvatar>
                        <Box m={.5}>
                            <Button className="admin-btn" variant="outlined" onClick={(event) => renderCollectionDetail(event, item)}>Edit</Button>
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

export default AdminCollection;