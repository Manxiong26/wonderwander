import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useHistory, useParams } from 'react-router-dom';
import AdminNav from '../AdminNav/AdminNav';

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

function AdminSponsor() {

    let {id} = useParams();
    //console.log(id);

    //functionality to route to a page
    const history = useHistory();

    //functionality to dispatch information to a saga or reducer
    const dispatch = useDispatch();

    //redux store instances 
    const sponsorList = useSelector((store) => store.adminSponsorListReducer);
    const sponsor = useSelector((store) => store.adminSponsorInfoReducer);
    console.log('sponsor reducer id:', sponsor.id);

    //retrieves sponsors' info from DB
    useEffect(() => {
        dispatch({ type: 'FETCH_SPONSOR_LIST' });
    }, []);

    //sets local state for post request
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [description, setDescription] = useState('');
    const [site_link, setSiteLink] = useState('');

    //edit mode
    const [editMode, setEditMode] = useState(false);

    //post to saga
    const addSponsor = () => {
        
        //create object to send
        const newSponsor = {
            name: name,
            logo: logo,
            description: description,
            site_link: site_link,
        }
        
        //dispatch to sponsorList saga
        dispatch({ type: 'ADD_SPONSOR', payload: newSponsor });
        
        //alert successful post
        swal({
            text: "This sponsor has been added to your list!",
            icon: "success"
        });

        //updates artist list on DOM
        dispatch({ type: 'FETCH_SPONSOR_LIST' });

        //clears input fields
        setName('');
        setLogo('');
        setDescription('');
        setSiteLink('');
    }

    //renders specific sponsor's details in input feilds to edit
    const renderSponsorDetail = (event, item) => {
        console.log('clicking edit for Sponsor = ', item);

        //sets specific sponsor in sponsor reducer 
        dispatch({type: 'SET_SPONSOR_INFO', payload: item}); // 

        //renders form view from add to edit mode
        setEditMode(true);
 
        //shows specific artist's details in input fields for editing
        setName(item.name);
        setLogo(item.logo);
        setDescription(item.description);
        setSiteLink(item.site_link);
    }

    //update (edit) sponsor information
    const updateSponsorInfo = () => {
        
        //create updated sponsor object
        const updatedSponsorInfo = {
            id: sponsor.id, 
            name: name,
            logo: logo,
            description: description,
            site_link: site_link,
        }

        console.log('updated sponsor info:', updatedSponsorInfo);

        //send updated sponsor info to sponsor saga
        dispatch({type: 'UPDATE_SPONSOR_INFO', payload: updatedSponsorInfo});

        //swal success indicator
        swal({
            text: "This sponsor's information has been updated!",
            icon: "success" 
        });

        //turn editMode off
        setEditMode(false);

        //clears input fields
        setName('');
        setLogo('');
        setDescription('');
        setSiteLink('');
    }

    //cancel (editMode) button - returns to add sponsor form
    const renderToInfo = () => {
        setEditMode(false);

        //clears input fields
        setName('');
        setLogo('');
        setDescription('');
        setSiteLink('');
    }

    //delete sponsor 
    const deleteSponsor = (id) => {
        console.log('deleting sponsor:', id);
        
        //dispatch to saga w sponsor id 
        dispatch({type: 'DELETE_SPONSOR', payload: id})
    }

    //alerts admin to verify sponsor deletion
    const deleteValidation = (id) => {
        console.log('delete clicked! id = ', id);

        swal({
            title: "Hello!",
            text: "Are you sure you want to PERMANENTLY delete this sponsor?",
            buttons: {
              cancel: true,
              confirm: "Delete"
            }
        }).then(val => {
          if(val) {
            swal({
              text: "You've deleted this sponsor.",
            });
            deleteSponsor(id);
          }
        });
    }
  
    return (
      <div>
          <AdminNav />
          {editMode ?
          <div>
              <Typography variant="h4">Edit Sponsor</Typography>
              <form className="admin-form" onSubmit={updateSponsorInfo}>
                <TextField type="text"
                    placeholder="Sponsor Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Sponsor Logo"
                    value={logo}
                    onChange={(event) => setLogo(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Website URL"
                    value={site_link}
                    onChange={(event) => setSiteLink(event.target.value)}
                />
                <Button className="admin-btn" type="submit" name="submit" variant="outlined" value="Update">Update</Button>
                <Button className="admin-btn" variant="outlined" onClick={renderToInfo}>Cancel</Button>
              </form>
          </div>
          :    
          <div>
              <Typography variant="h4">Add Sponsor</Typography>
              <form className="admin-form" onSubmit={addSponsor}>
                <TextField type="text"
                    placeholder="Sponsor Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Logo URL"
                    value={logo}
                    onChange={(event) => setLogo(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <TextField type="text"
                    placeholder="Website URL"
                    value={site_link}
                    onChange={(event) => setSiteLink(event.target.value)}
                />
                <Button className="admin-btn" type="submit" name="submit" variant="outlined" value="Submit">Submit</Button>
              </form>
          </div>}
          
          {/* Sponsor List. Always shows. */}
          {/* Edit clickability renders a specific sponsor's details in the edit form */}
          <div>
              <Typography variant="h5">Sponsor List</Typography>
            <List>
                {sponsorList.map((item, i) =>
                    <div>
                    <ListItem key={i} > 
                        <ListItemAvatar>
                        <Typography variant="h6">
                            <img src={item.logo} alt="Sponsor Logo" width="50" height="50" /> 
                            {item.name} 
                        </Typography>
                        </ListItemAvatar>
                        <Box m={.5}>
                            <Button className="admin-btn" variant="outlined" onClick={(event) => renderSponsorDetail(event, item)}>Edit</Button>
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

export default AdminSponsor;