import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import AdminNav from "../AdminNav/AdminNav";

import {
  Button,
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
  makeStyles,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { useStyles } from "../classes";

function AdminArtwork() {
  let { id } = useParams();
  //console.log(id);

  const classes = useStyles();

  //functionality to route to a page
  const history = useHistory();

  //functionality to dispatch information to a saga or reducer
  const dispatch = useDispatch();

  //redux store instances
  const artworkList = useSelector((store) => store.adminArtworkListReducer);
  const artwork = useSelector((store) => store.adminArtworkInfoReducer);
  console.log("artwork reducer id:", artwork.id);

  const artistList = useSelector((store) => store.adminArtistListReducer);
  const sponsorList = useSelector((store) => store.adminSponsorListReducer);
  const collectionList = useSelector((store) => store.adminCollectionListReducer);
  const seeList = useSelector((store) => store.adminSeeListArtworkReducer);
  console.log('seeList reducer: ', seeList)
    const see = useSelector ((store) => store.adminSeeInfoReducer);
    const doList = useSelector((store) => store.adminDoListArtworkReducer);
    const doItem = useSelector((store) => store.adminDoReducer);


  //retrieves info from DB
  useEffect(() => {
    dispatch({ type: "FETCH_ARTWORK_LIST" });
    dispatch({ type: "FETCH_ARTIST_LIST" });
    dispatch({ type: "FETCH_SPONSOR_LIST" });
    dispatch({ type: "FETCH_COLLECTION_LIST" });
  }, []);

  //sets local state for post request
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [vid_link, setVidLink] = useState("");
  const [vid_description, setVidDescription] = useState("");
  const [artist_id, setArtistId] = useState("");
  const [sponsor_id, setSponsorId] = useState("");
  const [collection_id, setCollectionId] = useState("");

  //edit mode
  const [editMode, setEditMode] = useState(false);

  //post to saga
  const addArtwork = () => {
    //create object to send
    const newArtwork = {
      name: name,
      year: year,
      lat: lat,
      lng: lng,
      image: image,
      description: description,
      vid_link: vid_link,
      vid_description: vid_description,
      artist_id: artist_id,
      sponsor_id: sponsor_id,
      collection_id: collection_id,
    };

    //dispatch to artworkList saga
    dispatch({ type: "ADD_ARTWORK", payload: newArtwork });

    //updates artwork list on DOM
    dispatch({ type: "FETCH_ARTWORK_LIST" });

    //alert successful post
    swal({
      text: "This artwork has been added to your list!",
      icon: "success",
    });

    //TODO - Reset dropdown to default values (artis, sponsor, collection)

    //clears input fields
    setName("");
    setYear("");
    setLat("");
    setLng("");
    setImage("");
    setDescription("");
    setVidLink("");
    setVidDescription("");
    setArtistId("");
    setSponsorId("");
    setCollectionId("");
  };

  //renders specific artwork's details in input feilds to edit
  const renderArtworkDetail = (event, item) => {
    console.log("clicking edit for Artwork = ", item);

    //sets specific artwork in artwork reducer
    dispatch({ type: "SET_ARTWORK_INFO", payload: item }); //

    // sets see/do list for specific artwork in seeList/doList reducers
    dispatch({ type: "FETCH_SEE_LIST_ARTWORK", payload: item.id });
    dispatch({ type: "FETCH_DO_LIST_ARTWORK", payload: item.id });

    //renders form view from add to edit mode
    setEditMode(true);

    //shows specific artwork's details in input fields for editing
    setName(item.name);
    setYear(item.year);
    setLat(item.lat);
    setLng(item.lng);
    setImage(item.image);
    setDescription(item.description);
    setVidLink(item.vid_link);
    setVidDescription(item.vid_description);
    setArtistId(item.artist_id);
    setSponsorId(item.sponsor_id);
    setCollectionId(item.collection_id);
  };

  //update (edit) artwork information
  const updateArtworkInfo = () => {
    //create updated artwork object
    const updatedArtworkInfo = {
      id: artwork.id,
      name: name,
      year: year,
      lat: lat,
      lng: lng,
      image: image,
      description: description,
      vid_link: vid_link,
      vid_description: vid_description,
      artist_id: artist_id,
      sponsor_id: sponsor_id,
      collection_id: collection_id,
    };

    console.log("updated artwork info:", updatedArtworkInfo);

    //send updated artwork info to artwork saga
    dispatch({ type: "UPDATE_ARTWORK_INFO", payload: updatedArtworkInfo });

    //swal success indicator
    swal({
      text: "This artwork's information has been updated!",
      icon: "success",
    });

    //TODO - Reset dropdown to default values (artis, sponsor, collection)

    //turn editMode off
    setEditMode(false);

    //clears input fields
    setName("");
    setYear("");
    setLat("");
    setLng("");
    setImage("");
    setDescription("");
    setVidLink("");
    setVidDescription("");
    setArtistId("");
    setSponsorId("");
    setCollectionId("");
  };

  //cancel (editMode) button - returns to add artwork form
  const renderToInfo = () => {
    setEditMode(false);

    //clears input fields
    setName("");
    setYear("");
    setLat("");
    setLng("");
    setImage("");
    setDescription("");
    setVidLink("");
    setVidDescription("");
    setArtistId("");
    setSponsorId("");
    setCollectionId("");
  };

  //delete artwork
  const deleteArtwork = (id) => {
    console.log("deleting artwork:", id);

    //dispatch to saga w artwork id
    dispatch({ type: "DELETE_ARTWORK", payload: id });
  };

  //alerts admin to verify artwork deletion
  const deleteValidation = (id) => {
    console.log("delete clicked! id = ", id);

    swal({
      title: "Hello!",
      text: "Are you sure you want to PERMANENTLY delete this artwork?",
      buttons: {
        cancel: true,
        confirm: "Delete",
      },
    }).then((val) => {
      if (val) {
        swal({
          text: "You've deleted this artwork.",
        });
        deleteArtwork(id);
      }
    });
  };

  //sets local state for See/Do post request
  const [do_prompts, setDoPrompts] = useState("");
  const [see_prompts, setSeePrompts] = useState("");
  const [link, setLink] = useState("");
  const [artwork_id, setArtworkId] = useState("");
  const [seeId, setSeeId] = useState("");
  const [doId, setDoId] = useState("");

  const addSee = () => {
    console.log("Add See Clicked.");

    //create object to send
    const newSee = {
      prompts: see_prompts,
      link: link,
      artwork_id: artwork_id,
      activity_id: null,
    };
    console.log("Adding see object: ", newSee);

    //TODO - double check this //dispatch to artAdventure saga
    dispatch({ type: "ADD_SEE_ARTWORK", payload: newSee });

    //updates see list on DOM (where/are we listing the see prompts ?)

    //alert successful post
    swal({
      text: `This 'See' has been added to your artwork!`,
      icon: "success",
    });

    //TODO - Reset dropdown to default value

    //clears input fields
    setSeePrompts("");
    setLink("");
    setArtworkId("");
  };

  const addDo = () => {
    console.log("Add Do Clicked.");

    //create object to send
    const newDo = {
      prompts: do_prompts,
      artwork_id: artwork_id,
      activity_id: null,
    };
    console.log("Adding do object: ", newDo);

    // TODO - Double check this //dispatch to artAdventure saga
    dispatch({ type: "ADD_DO_ARTWORK", payload: newDo });

    //updates do list on DOM (where/are we listing the do prompts ?)

    //alert successful post
    swal({
      text: `This 'Do' has been added to your artwork!`,
      icon: "success",
    });

    //TODO - Reset dropdown to default value

    //clears input fields
    setDoPrompts("");
    setArtworkId("");
  };

  //changes db boolean to true which "publishes" item on public facing pages
  const publish = (event, item) => {
    console.log("clicking publish for Artwork = ", item);

    //sets specific artwork in artwork reducer
    dispatch({ type: "SET_ARTWORK_INFO", payload: item });

    let pubObject;

    if (item.published === true) {
      //changes item boolean to true
      pubObject = {
        id: item.id,
        published: false,
      };
      //swal success indicator
      swal({
        text: "This artwork's information is now unpublished!",
        icon: "success",
      });
    } else {
      pubObject = {
        id: item.id,
        published: true,
      };
      //swal success indicator
      swal({
        text: "This artwork's information has been published!",
        icon: "success",
      });
    }
    //sends updated artwork info
    // (published boolean true/false) to artwork saga
    dispatch({ type: "UPDATE_PUBLISH_ARTWORK", payload: pubObject });
  };

  return (
    <div>
      <AdminNav />
      <Grid container spacing={1} direction="row">
        {editMode ? (
          <>
            <Grid item lg={4} sm={12} xs={12} className={classes.grid}>
              <Card elevation={6} className={classes.cardForm}>
                <div className={classes.cardContent}>
                  <Typography
                    className={classes.title}
                    align="center"
                    variant="h4"
                  >
                    Edit Artwork
                  </Typography>
                  <form className={classes.form} onSubmit={updateArtworkInfo}>
                    <TextField
                      type="text"
                      className={classes.inputs}
                      variant="outlined"
                      placeholder="Artwork Title"
                      label="Artwork Title"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                    <TextField
                      type="text"
                      className={classes.inputs}
                      variant="outlined"
                      placeholder="Year"
                      label="Year"
                      value={year}
                      onChange={(event) => setYear(event.target.value)}
                    />
                    <TextField
                      type="number"
                      className={classes.inputs}
                      variant="outlined"
                      placeholder="Latitude"
                      label="Latitude"
                      value={lat}
                      onChange={(event) => setLat(event.target.value)}
                    />
                    <TextField
                      type="number"
                      className={classes.inputs}
                      variant="outlined"
                      placeholder="Longitude"
                      label="Longitude"
                      value={lng}
                      onChange={(event) => setLng(event.target.value)}
                    />
                    <TextField
                      type="text"
                      className={classes.inputs}
                      variant="outlined"
                      placeholder="Image URL"
                      label="Image URL"
                      value={image}
                      onChange={(event) => setImage(event.target.value)}
                    />
                    <TextField
                      type="text"
                      className={classes.inputs}
                      variant="outlined"
                      placeholder="Description"
                      label="Description"
                      value={description}
                      multiline
                      rows={6}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                    <TextField
                      type="text"
                      className={classes.inputs}
                      variant="outlined"
                      placeholder="Video URL"
                      label="Video URL"
                      value={vid_link}
                      onChange={(event) => setVidLink(event.target.value)}
                    />
                    <TextField
                      type="text"
                      className={classes.inputs}
                      variant="outlined"
                      placeholder="Video Description"
                      label="Video Description"
                      value={vid_description}
                      multiline
                      rows={6}
                      onChange={(event) =>
                        setVidDescription(event.target.value)
                      }
                    />
                    {/* generates artist options dynamically */}
                    <select
                      type="text"
                      onChange={(event) => setArtistId(event.target.value)}
                    >
                      <option value="Default">Artist</option>
                      {artistList.map((artist) => {
                        return (
                          <option key={artist.id} value={artist.id}>
                            {artist.name}
                          </option>
                        );
                      })}
                    </select>
                    {/* generates sponsor options dynamically */}
                    <select
                      type="text"
                      onChange={(event) => setSponsorId(event.target.value)}
                    >
                      <option value="Default">Sponsor</option>
                      {sponsorList.map((sponsor) => {
                        return (
                          <option key={sponsor.id} value={sponsor.id}>
                            {sponsor.name}
                          </option>
                        );
                      })}
                    </select>
                    {/* generates collection options dynamically */}
                    <select
                      type="text"
                      onChange={(event) => setCollectionId(event.target.value)}
                    >
                      <option value="Default">Collection</option>
                      {collectionList.map((collection) => {
                        return (
                          <option key={collection.id} value={collection.id}>
                            {collection.name}
                          </option>
                        );
                      })}
                    </select>
                    <Button
                      className={classes.formBtn}
                      type="submit"
                      name="submit"
                      variant="outlined"
                      value="Update"
                    >
                      Update
                    </Button>
                    <Button
                      className={classes.formBtn}
                      variant="outlined"
                      onClick={renderToInfo}
                    >
                      Cancel
                    </Button>
                  </form>
                </div>
              </Card>
            </Grid>

            {/* EDIT SEE CARD */}

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
                    <TableBody >
                        {seeList.map((item, i) => (
                            <TableRow alignItems="flex-start" key={i}>
                           <TableCell className={classes.thumbnailContainer}>
                               <img
                              src={item.link}
                              alt="See Prompt Image"
                              className={classes.thumbnail}
                            />
                           </TableCell> 
                           <TableCell>
                           <Typography noWrap="true" variant="body1">{item.prompts}</Typography>
                         </TableCell>
                         <TableCell align="right">
                            <IconButton>
                              <EditIcon
                                className={classes.btn}
                                variant="outlined"
                                onClick={() => alert('CREATE A FUNCTION FOR ME!!!')}
                              />
                            </IconButton>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton>
                              <DeleteIcon
                                color="primary"
                                className={classes.btn}
                                variant="outlined"
                                onClick={() => alert('CREATE A FUNCTION FOR ME!!!')}
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

            {/* EDIT DO CARD */}
            
            <Grid item lg={4} sm={12} xs={12} className={classes.grid}>
              <Card elevation={6} className={classes.cardForm}>
                <div className={classes.cardContent}>
                  <Typography
                    className={classes.title}
                    align="center"
                    variant="h4"
                  >
                    Edit Do
                  </Typography>
                  <form className={classes.form}></form>
                </div>
              </Card>
            </Grid>
          </>
        ) : (
          <>
            <Grid item lg={5} sm={12} xs={12} className={classes.grid}>
              <Card elevation={6} className={classes.cardForm}>
                <div className={classes.cardContent}>
                  <Typography
                    className={classes.title}
                    align="center"
                    variant="h4"
                  >
                    Add Artwork
                  </Typography>
                  <form className={classes.form} onSubmit={addArtwork}>
                    <TextField
                      type="text"
                      className={classes.inputs}
                      variant="outlined"
                      placeholder="Artwork Title"
                      label="Artwork Title"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                    <TextField
                      type="text"
                      className={classes.inputs}
                      variant="outlined"
                      placeholder="Year"
                      label="Year"
                      value={year}
                      onChange={(event) => setYear(event.target.value)}
                    />
                    <TextField
                      type="number"
                      className={classes.inputs}
                      variant="outlined"
                      placeholder="Latitude"
                      label="Latitude"
                      value={lat}
                      onChange={(event) => setLat(event.target.value)}
                    />
                    <TextField
                      type="number"
                      className={classes.inputs}
                      variant="outlined"
                      placeholder="Longitude"
                      label="Longitude"
                      value={lng}
                      onChange={(event) => setLng(event.target.value)}
                    />
                    <TextField
                      type="text"
                      className={classes.inputs}
                      variant="outlined"
                      placeholder="Longitude"
                      label="Longitude"
                      value={image}
                      onChange={(event) => setImage(event.target.value)}
                    />
                    <TextField
                      type="text"
                      className={classes.inputs}
                      variant="outlined"
                      placeholder="Description"
                      label="Description"
                      multiline
                      rows={6}
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    />
                    <TextField
                      type="text"
                      className={classes.inputs}
                      variant="outlined"
                      placeholder="Video URL"
                      label="Video URL"
                      value={vid_link}
                      onChange={(event) => setVidLink(event.target.value)}
                    />
                    <TextField
                      type="text"
                      className={classes.inputs}
                      variant="outlined"
                      placeholder="Video Description"
                      label="Video Description"
                      multiline
                      rows={6}
                      value={vid_description}
                      onChange={(event) =>
                        setVidDescription(event.target.value)
                      }
                    />
                    {/* generates artist options dynamically */}
                    <select
                      type="text"
                      onChange={(event) => setArtistId(event.target.value)}
                    >
                      <option value="Default">Artist</option>
                      {artistList.map((artist) => {
                        return (
                          <option key={artist.id} value={artist.id}>
                            {artist.name}
                          </option>
                        );
                      })}
                    </select>
                    {/* generates sponsor options dynamically */}
                    <select
                      type="text"
                      onChange={(event) => setSponsorId(event.target.value)}
                    >
                      <option value="Default">Sponsor</option>
                      {sponsorList.map((sponsor) => {
                        return (
                          <option key={sponsor.id} value={sponsor.id}>
                            {sponsor.name}
                          </option>
                        );
                      })}
                    </select>
                    {/* generates collection options dynamically */}
                    <select
                      type="text"
                      onChange={(event) => setCollectionId(event.target.value)}
                    >
                      <option value="Default">Collection</option>
                      {collectionList.map((collection) => {
                        return (
                          <option key={collection.id} value={collection.id}>
                            {collection.name}
                          </option>
                        );
                      })}
                    </select>
                    <Button
                      className={classes.formBtn}
                      type="submit"
                      name="submit"
                      variant="outlined"
                      value="Submit"
                    >
                      Submit
                    </Button>
                  </form>

                  {/* Add See Form */}
                  <Typography variant="h4">Add See</Typography>
                  <form className="admin-form" onSubmit={addSee}>
                    <TextField
                      type="text"
                      placeholder="Prompt"
                      value={see_prompts}
                      onChange={(event) => setSeePrompts(event.target.value)}
                    />
                    <TextField
                      type="text"
                      placeholder="Image/Video URL"
                      value={link}
                      onChange={(event) => setLink(event.target.value)}
                    />
                    {/* generates artwork options dynamically */}
                    <select
                      type="text"
                      onChange={(event) => setArtworkId(event.target.value)}
                    >
                      <option value="Default">Artwork</option>
                      {artworkList.map((artwork) => {
                        return (
                          <option key={artwork.id} value={artwork.id}>
                            {artwork.name}
                          </option>
                        );
                      })}
                    </select>
                    <Button
                      className="admin-btn"
                      type="submit"
                      name="submit"
                      variant="outlined"
                      value="Submit"
                    >
                      Submit
                    </Button>
                  </form>

                  {/* Add Do Form */}
                  <Typography variant="h4">Add Do</Typography>
                  <form className="admin-form" onSubmit={addDo}>
                    <TextField
                      type="text"
                      placeholder="Prompt"
                      value={do_prompts}
                      onChange={(event) => setDoPrompts(event.target.value)}
                    />
                    {/* generates artwork options dynamically */}
                    <select
                      type="text"
                      onChange={(event) => setArtworkId(event.target.value)}
                    >
                      <option value="Default">Artwork</option>
                      {artworkList.map((artwork) => {
                        return (
                          <option key={artwork.id} value={artwork.id}>
                            {artwork.name}
                          </option>
                        );
                      })}
                    </select>
                    <Button
                      className="admin-btn"
                      type="submit"
                      name="submit"
                      variant="outlined"
                      value="Submit"
                    >
                      Submit
                    </Button>
                  </form>
                </div>
              </Card>
            </Grid>

            <Grid item lg={7} sm={12} xs={12}>
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
                    Artwork List
                  </Typography>
                  <Table className={classes.table}>
                    <TableBody>
                      {artworkList.map((item, i) => (
                        <TableRow alignItems="flex-start" key={i}>
                          <TableCell className={classes.thumbnailContainer}>
                            <img
                              src={item.image}
                              alt="Artist Image"
                              className={classes.thumbnail}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1">{item.name}</Typography>
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
                                onClick={(event) =>
                                  renderArtworkDetail(event, item)
                                }
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

    //   {/* Artwork List. Always shows. */}
    //   {/* Edit clickability renders a specific artwork's details in the edit form */}
  );
}

export default AdminArtwork;
