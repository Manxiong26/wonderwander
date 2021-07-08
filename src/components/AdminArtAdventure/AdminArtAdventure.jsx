import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import AdminNav from '../AdminNav/AdminNav'
import ImageUpload from '../ImageUpload/ImageUpload';

import {
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
  Grid,
  Card,
  IconButton,
  Select,
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

  let { id } = useParams();
  
  const history = useHistory();

  const classes = useStyles();

  const dispatch = useDispatch();

  //redux store instances 
  const artAdventureList = useSelector((store) => store.adminArtAdventureListReducer);
  const artAdventure = useSelector((store) => store.adminArtAdventureInfoReducer);
  const seeList = useSelector((store) => store.adminSeeListReducer);
  const see = useSelector((store) => store.adminSeeInfoReducer);
  const doList = useSelector((store) => store.adminDoListReducer);
  const doItem = useSelector((store) => store.adminDoReducer);

  //retrieves art adventures' info from DB on page load
  useEffect(() => {
    dispatch({ type: 'FETCH_ADVENTURE_LIST' });
  }, []);

  //sets local state for Adventure post request
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

    //sets specific art adventure in art adventure reducer 
    dispatch({ type: 'SET_ADVENTURE_INFO', payload: item });

    //sets see/do lists for specific adventure in seeList/doList reducers
    dispatch({ type: 'FETCH_SEE_LIST', payload: item.id });
    dispatch({ type: 'FETCH_DO_LIST', payload: item.id });

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

    //send updated art adventure info to art adventure saga
    dispatch({ type: 'UPDATE_ADVENTURE_INFO', payload: updatedArtAdventureInfo });

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

    //dispatch to saga w art adventure id 
    dispatch({ type: 'DELETE_ADVENTURE', payload: id })
  }

  //alerts admin to verify artist deletion
  const deleteValidation = (id) => {

    swal({
      title: "Hello!",
      text: "Are you sure you want to PERMANENTLY delete this adventure?",
      buttons: {
        cancel: true,
        confirm: "Delete"
      }
    }).then(val => {
      if (val) {
        swal({
          text: "You've deleted this adventure.",
        });
        deleteArtAdventure(id);
      }
    });
  }

  //sets local state for See/Do post request
  const [do_prompts, setDoPrompts] = useState('');
  const [see_prompts, setSeePrompts] = useState('');
  const [see_image, setSeeImage] = useState('');
  const [link, setLink] = useState('');
  const [adventure_id, setAdventureId] = useState('');
  const [seeId, setSeeId] = useState('');
  const [doId, setDoId] = useState('');

  const addSee = () => {

    //create object to send
    const newSee = {
      prompts: see_prompts,
      image: see_image,
      link: link,
      artwork_id: null,
      activity_id: adventure_id,
    }

    //dispatch to artAdventure saga
    dispatch({ type: 'ADD_SEE', payload: newSee });

    //alert successful post
    swal({
      text: `This 'See' has been added to your activity!`,
      icon: "success"
    });

    //clears input fields
    setSeePrompts('');
    setSeeImage('');
    setLink('');
    setAdventureId('');
  }

  const addDo = () => {

    //create object to send
    const newDo = {
      prompts: do_prompts,
      artwork_id: null,
      activity_id: adventure_id,
    }

    //dispatch to artAdventure saga
    dispatch({ type: 'ADD_DO', payload: newDo });

    //alert successful post
    swal({
      text: `This 'Do' has been added to your activity!`,
      icon: "success"
    });

    //clears input fields
    setDoPrompts('');
    setAdventureId('');
  }

  //delete see
  const deleteSee = (event, item) => {

    //dispatch to artwork saga w see id
    dispatch({ type: "DELETE_SEE", payload: item.id });

    //TODO - Refresh See list for this specific adventure

    //sweet alert lets admin know item has been deleted
    swal({
      text: `This 'See' has been deleted!`,
      icon: "success"
    });
  };

  //delete do
  const deleteDo = (event, item) => {

    //dispatch to artwork saga w see id
    dispatch({ type: "DELETE_DO", payload: item.id });

    //TODO - Refresh See list for this specific adventure

    //sweet alert lets admin know item has been deleted
    swal({
      text: `This 'Do' has been deleted!`,
      icon: "success"
    });
  };

  //changes db boolean to true which "publishes" item on public facing pages
  const publish = (event, item) => {

    //sets specific adventure in artAdventure reducer
    dispatch({ type: "SET_ADVENTURE_INFO", payload: item });

    let pubObject;

    if (item.published === true) {
      //changes item boolean to true
      pubObject = {
        id: item.id,
        published: false,
      };
    } else {
      pubObject = {
        id: item.id,
        published: true,
      };
    }

    //sends updated art adventure boolean (published/unpublished) to artAdventure saga
    dispatch({ type: "UPDATE_PUBLISH_ADVENTURE", payload: pubObject });
  };

  //changes db boolean to true which "publishes" item on public facing pages
  const publishSee = (event, item) => {

    //sets specific see in See reducer
    dispatch({ type: "SET_SEE_INFO", payload: item });

    let pubObject;

    if (item.published === true) {
      //changes item boolean to true
      pubObject = {
        id: item.id,
        published: false,
      };
      //swal success indicator
      // swal({
      //     text: `This 'See' is now unpublished!`,
      //     icon: "success",
      // });
    } else {
      pubObject = {
        id: item.id,
        published: true,
      };
      //swal success indicator
      // swal({
      //     text: `This 'See' has been published!`,
      //     icon: "success",
      // });
    }

    //sends updated 'See' boolean (publish/unpublish) to art adventure saga
    dispatch({ type: "UPDATE_PUBLISH_SEE", payload: pubObject });
  };

  //changes db boolean to true which "publishes" item on public facing pages
  const publishDo = (event, item) => {

    //sets specific do in Do reducer
    dispatch({ type: "SET_DO_INFO", payload: item });

    let pubObject;

    if (item.published === true) {
      //changes item boolean to true
      pubObject = {
        id: item.id,
        published: false,
      };
      //swal success indicator
      // swal({
      //     text: `This 'Do' is now unpublished!`,
      //     icon: "success",
      // });
    } else {
      pubObject = {
        id: item.id,
        published: true,
      };
      //swal success indicator
      // swal({
      //     text: `This 'Do' has been published!`,
      //     icon: "success",
      // });
    }

    //sends updated 'Do' boolean (publish/unpublish) to art adventure saga
    dispatch({ type: "UPDATE_PUBLISH_DO", payload: pubObject });
  };

  return (
    <div>
      <AdminNav />
      <Grid container spacing={1} direction="row">
        {editMode ? (
          <>
            {/* Edit Adventure Form */}
            <Grid item lg={4} sm={12} xs={12}>
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

            {/* Edit See Form */}
            <Grid item lg={4} sm={12} xs={12} className={classes.grid}>
              <TableContainer
                elevation={6}
                component={Card}
                className={classes.cardTable}
              >
                <div className={classes.tableContent}>
                  <Typography
                    className={classes.title}
                    align="center"
                    variant="h4"
                  >
                    Edit See
                  </Typography>
                  <form className={classes.form}>
                    <Table className={classes.table}>
                      <TableBody>
                        {seeList.map((item, i) => (
                          <TableRow alignItems="flex-start" key={i}>
                            <TableCell className={classes.thumbnailContainer}>
                              <img
                                src={item.see_image}
                                alt="See Prompt Image"
                                className={classes.thumbnail}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography noWrap="true" variant="body1">
                                {item.prompts}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <FormControlLabel
                                control={
                                  <Switch
                                    size="small"
                                    checked={item.published}
                                    onChange={(event) => publishSee(event, item)}
                                    name="publish"
                                    color="primary"
                                  />
                                }
                                labelPlacement="top"
                                label="Publish"
                              />
                            </TableCell>
                            <TableCell align="right">
                              <IconButton>
                                <DeleteIcon
                                  color="primary"
                                  className={classes.btn}
                                  variant="outlined"
                                  onClick={(event) => deleteSee(event, item)}
                                />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </form>
                </div>
              </TableContainer>
            </Grid>

            {/* Edit Do Form */}
            <Grid item lg={4} sm={12} xs={12} className={classes.grid}>
              <TableContainer
                elevation={6}
                component={Card}
                className={classes.cardTable}
              >
                <div className={classes.tableContent}>
                  <Typography
                    className={classes.title}
                    align="center"
                    variant="h4"
                  >
                    Edit Do
                  </Typography>
                  <form className={classes.form}>
                    <Table className={classes.table}>
                      <TableBody>
                        {doList.map((item, i) => (
                          <TableRow alignItems="flex-start" key={i}>
                            <TableCell>
                              <Typography noWrap="true" variant="body1">
                                {item.prompts}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <FormControlLabel
                                control={
                                  <Switch
                                    size="small"
                                    checked={item.published}
                                    onChange={(event) => publishDo(event, item)}
                                    name="publish"
                                    color="primary"
                                  />
                                }
                                labelPlacement="top"
                                label="Publish"
                              />
                            </TableCell>
                            <TableCell align="right">
                              <IconButton>
                                <DeleteIcon
                                  color="primary"
                                  className={classes.btn}
                                  variant="outlined"
                                  onClick={(event) => deleteDo(event, item)}
                                />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </form>
                </div>
              </TableContainer>
            </Grid>
          </>
        ) : (
          <>
            {/* Add Adventure Form */}
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

                  {/* Add See Form */}
                  <Typography className={classes.title} align="center" variant="h4">Add See</Typography>
                  <form className="admin-form" onSubmit={addSee}>
                    <TextField type="text"
                      placeholder="Prompt"
                      value={see_prompts}
                      onChange={(event) => setSeePrompts(event.target.value)}
                    />
                    <TextField type="text"
                      placeholder="Image URL"
                      value={see_image}
                      onChange={(event) => setSeeImage(event.target.value)}
                    />
                    <TextField type="text"
                      placeholder="Video URL"
                      value={link}
                      onChange={(event) => setLink(event.target.value)}
                    />
                    {/* generates adventure options dynamically */}
                    <select type="text"
                      onChange={(event) => setAdventureId(event.target.value)}
                    >
                      <option value="Default">Adventure</option>
                      {artAdventureList.map((adventure) => {
                        return (<option key={adventure.id} value={adventure.id}>{adventure.title}</option>);
                      })}
                    </select>
                    <Button className="admin-btn" type="submit" name="submit" variant="outlined" value="Submit">Submit</Button>
                  </form>

                  {/* Add Do Form */}
                  <Typography className={classes.title} align="center" variant="h4">Add Do</Typography>
                  <form className="admin-form" onSubmit={addDo}>
                    <TextField type="text"
                      placeholder="Prompt"
                      value={do_prompts}
                      onChange={(event) => setDoPrompts(event.target.value)}
                    />
                    {/* generates adventure options dynamically */}
                    <select type="text"
                      onChange={(event) => setAdventureId(event.target.value)}
                    >
                      <option value="Default">Adventure</option>
                      {artAdventureList.map((adventure) => {
                        return (<option key={adventure.id} value={adventure.id}>{adventure.title}</option>);
                      })}
                    </select>

                    {/* <ImageUpload /> */}

                    <Button className="admin-btn" type="submit" name="submit" variant="outlined" value="Submit">Submit</Button>
                  </form>
                </div>
              </Card>
            </Grid>

            {/* Adventure List */}
            {/* Edit clickability renders a specific art adventure's details in the edit form */}

            <Grid item lg={7} xs={12}>
              <TableContainer
                elevation={6}
                component={Card}
                className={classes.cardTable}
              >
                <div className={classes.tableContent}>
                  <Typography className={classes.title} align="center" variant="h4">
                    <u>Adventure List</u>
                  </Typography>
                  <Table className={classes.table}>
                    <TableBody>
                      {artAdventureList.map((item, i) => (
                        <TableRow alignItems="flex-start" key={i}>
                          <TableCell className={classes.thumbnailContainer}>
                            <img
                              src={item.image}
                              alt="Adventure Image"
                              className={classes.thumbnail}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1">{item.title}</Typography>
                          </TableCell>
                          <TableCell>
                            <FormControlLabel
                              control={
                                <Switch
                                  size="small"
                                  checked={item.published}
                                  onChange={(event) => publish(event, item)}
                                  name="publish"
                                  color="primary"
                                />
                              }
                              labelPlacement="top"
                              label="Publish"
                            />
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
          </>
        )}
      </Grid>
    </div>
  );
}

export default AdminArtAdventure;