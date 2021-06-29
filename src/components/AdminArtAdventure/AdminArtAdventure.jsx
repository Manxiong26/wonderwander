import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useHistory, useParams } from 'react-router-dom';
import AdminNav from '../AdminNav/AdminNav'

import {
    Button,
    Typography,
    TextField,
    Grid,
    Card,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
  } from "@material-ui/core";
  import DeleteIcon from "@material-ui/icons/Delete";
  import EditIcon from "@material-ui/icons/Edit";
  
  import { useStyles } from "../classes";

function AdminArtAdventure() {

    let {id} = useParams();
    //console.log(id);

    //functionality to route to a page
    const history = useHistory();

    const classes = useStyles();

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
      <Grid container spacing={1} direction="row">
          {editMode ?
          <Grid item lg={5}  sm={12} xs={12}>
          <Card elevation={6} className={classes.cardForm}>
            <div className={classes.cardContent}>
              <Typography className={classes.title} align="center" variant="h4">Edit Adventure</Typography>
              <form className={classes.form} onSubmit={updateArtAdventureInfo}>
                <TextField type="text"
                    className={classes.inputs}
                    variant="outlined"
                    placeholder="Title"
                    label="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <TextField type="text"
                className={classes.inputs}
                variant="outlined"
                    placeholder="Description"
                    label="Description"
                    value={description}
                    multiline
                    rows={6}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <TextField type="text"
                className={classes.inputs}
                variant="outlined"
                    placeholder="Image URL"
                    label="Image URL"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                />
                <Button className={classes.formBtn} type="submit" name="submit" variant="outlined" value="Update">Update</Button>
                <Button className={classes.formBtn} variant="outlined" onClick={renderToInfo}>Cancel</Button>
              </form>
                </div>
          </Card>
          </Grid>
          : 
          <Grid item lg={5} sm={12} xs={12} >
          <Card elevation={6} className={classes.cardForm}>
            <div className={classes.cardContent}>  
              <Typography className={classes.title} align="center" variant="h4">Add Adventure</Typography>
              <form className={classes.form} onSubmit={addArtAdventure}>
                <TextField type="text"
                className={classes.inputs}
                variant="outlined"
                    placeholder="Title"
                    label="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <TextField type="text"
                className={classes.inputs}
                variant="outlined"
                    placeholder="Description"
                    label="Description"
                    value={description}
                    multiline
                    rows={6}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <TextField type="text"
                className={classes.inputs}
                variant="outlined"
                    placeholder="Image URL"
                    label="Image URL"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                />
                <Button className={classes.formBtn} type="submit" name="submit" variant="outlined" value="Submit">Submit</Button>
              </form>
          </div>
          </Card>
          </Grid>}
          
          {/* Adventure List. Always shows. */}
          {/* Edit clickability renders a specific art adventure's details in the edit form */}
          <Grid item lg={7} xs={12}>
        <TableContainer
          elevation={6}
          component={Card}
          className={classes.cardTable}
        >
          <div className={classes.tableContent}>
            <Typography className={classes.title} align="center" variant="h4">
              <u>Artist List</u>
            </Typography>
            <Table className={classes.table}>
              <TableBody>
                {artAdventureList.map((item, i) => (
                  <TableRow alignItems="flex-start" key={i}>
                    <TableCell className={classes.thumbnailContainer}>
                      <img
                        src={item.image}
                        alt="Artist Image"
                        className={classes.thumbnail}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{item.title}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        className={classes.btn}
                        variant="outlined"
                        onClick={(event) => publish(event, item)}
                      >
                        Publish
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <EditIcon
                          className={classes.btn}
                          variant="outlined"
                          onClick={(event) => renderArtAdventureDetail(event, item)}
                        />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <DeleteIcon
                          color="primary"
                          className={classes.btn}
                          variant="outlined"
                          onClick={() => deleteValidation(item.id)}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TableContainer>
      </Grid>
         </Grid>  
         </div>         
    );
}

export default AdminArtAdventure;