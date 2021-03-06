import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import AdminNav from "../AdminNav/AdminNav";
import ImageUpload from "../ImageUpload/ImageUpload";
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
  Popper,
  Modal,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useStyles } from "../classes";

function AdminArtwork({ truncateString }) {
  let { id } = useParams();

  const history = useHistory();

  const classes = useStyles();

  const dispatch = useDispatch();

  //redux store instances
  const artworkList = useSelector((store) => store.adminArtworkListReducer);
  const artwork = useSelector((store) => store.adminArtworkInfoReducer);
  const artistList = useSelector((store) => store.adminArtistListReducer);
  const sponsorList = useSelector((store) => store.adminSponsorListReducer);
  const collectionList = useSelector((store) => store.adminCollectionListReducer);
  const seeList = useSelector((store) => store.adminSeeListArtworkReducer);
  const see = useSelector((store) => store.adminSeeInfoReducer);
  const doList = useSelector((store) => store.adminDoListArtworkReducer);
  const doItem = useSelector((store) => store.adminDoReducer);

  //retrieves info from DB
  useEffect(() => {
    dispatch({ type: "FETCH_ARTWORK_LIST" });
    dispatch({ type: "FETCH_ARTIST_LIST" });
    dispatch({ type: "FETCH_SPONSOR_LIST" });
    dispatch({ type: "FETCH_COLLECTION_LIST" });
  }, []);


  //sets local state for Artwork post request
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

  //Artwork post to saga
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

    //sets specific artwork in artwork reducer
    dispatch({ type: "SET_ARTWORK_INFO", payload: item });

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

    //send updated artwork info to artwork saga
    dispatch({ type: "UPDATE_ARTWORK_INFO", payload: updatedArtworkInfo });

    //swal success indicator
    swal({
      text: "This artwork's information has been updated!",
      icon: "success",
    });

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

    //dispatch to saga w artwork id
    dispatch({ type: "DELETE_ARTWORK", payload: id });
  };

  //alerts admin to verify artwork deletion
  const deleteValidation = (id) => {

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
  const [see_image, setSeeImage] = useState("");
  const [link, setLink] = useState("");
  const [artwork_id, setArtworkId] = useState("");
  const [seeId, setSeeId] = useState("");
  const [doId, setDoId] = useState("");

  const addSee = () => {

    //create object to send
    const newSee = {
      prompts: see_prompts,
      image: see_image,
      link: link,
      artwork_id: artwork_id,
      activity_id: null,
    };

    //dispatch to artwork saga
    dispatch({ type: "ADD_SEE_ARTWORK", payload: newSee });

    //alert successful post
    swal({
      text: `This 'See' has been added to your artwork!`,
      icon: "success",
    });

    //clears input fields
    setSeePrompts("");
    setSeeImage("");
    setLink("");
    setArtworkId("");
  };

  const addDo = () => {

    //create object to send
    const newDo = {
      prompts: do_prompts,
      artwork_id: artwork_id,
      activity_id: null,
    };

    //dispatch to artwork saga
    dispatch({ type: "ADD_DO_ARTWORK", payload: newDo });

    //alert successful post
    swal({
      text: `This 'Do' has been added to your artwork!`,
      icon: "success",
    });

    //clears input fields
    setDoPrompts("");
    setArtworkId("");
  };

  //delete see
  const deleteSee = (item) => {

    let deleteObj = {
      id: item.id,
      artwork_id: item.artwork_id
    }

    //dispatch to artwork saga w see id
    dispatch({ type: "DELETE_SEE_ARTWORK", payload: deleteObj });

  };

  const deleteSeeValidation = (item) => {

    swal({
      title: "Hello!",
      text: "Are you sure you want to PERMANENTLY delete this See prompt?",
      buttons: {
        cancel: true,
        confirm: "Delete",
      },
    }).then((val) => {
      if (val) {
        swal({
          text: "You've deleted this prompt.",
        });
        deleteSee(item);
      }
    });
  };

  //delete do
  const deleteDo = (item) => {

    let deleteObj = {
      id: item.id,
      artwork_id: item.artwork_id
    }

    //dispatch to artwork saga w see id
    dispatch({ type: "DELETE_DO_ARTWORK", payload: deleteObj });
  };

  const deleteDoValidation = (item) => {

    swal({
      title: "Hello!",
      text: "Are you sure you want to PERMANENTLY delete this Do prompt?",
      buttons: {
        cancel: true,
        confirm: "Delete",
      },
    }).then((val) => {
      if (val) {
        swal({
          text: "You've deleted this prompt.",
        });
        deleteDo(item);
      }
    });
  };

  //changes db boolean to true which "publishes" item on public facing pages
  const publish = (event, item) => {

    //sets specific artwork in artwork reducer
    dispatch({ type: "SET_ARTWORK_INFO", payload: item });

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

    //sends updated artwork boolean (published/unpublished) to artwork saga
    dispatch({ type: "UPDATE_PUBLISH_ARTWORK", payload: pubObject });
  };

  //changes db boolean to true which "publishes" item on public facing pages
  const publishSee = (event, item) => {

    //sets specific artwork in artwork reducer
    dispatch({ type: "SET_SEE_INFO_ARTWORK", payload: item });

    let pubObject;

    if (item.published === true) {
      //changes item boolean to true
      pubObject = {
        id: item.id,
        published: false,
        artwork_id: item.artwork_id
      };
    } else {
      pubObject = {
        id: item.id,
        published: true,
        artwork_id: item.artwork_id
      };
    }

    //sends updated 'See' boolean (publish/unpublish) to artwork saga
    dispatch({ type: "UPDATE_PUBLISH_SEE_ARTWORK", payload: pubObject });
  };

  //changes db boolean to true which "publishes" item on public facing pages
  const publishDo = (event, item) => {

    //sets specific artwork in artwork reducer
    dispatch({ type: "SET_DO_INFO_ARTWORK", payload: item });

    let pubObject;

    if (item.published === true) {
      //changes item boolean to true
      pubObject = {
        id: item.id,
        published: false,
        artwork_id: item.artwork_id
      };
    } else {
      pubObject = {
        id: item.id,
        published: true,
        artwork_id: item.artwork_id
      };
    }

    //sends updated 'Do' boolean (publish/unpublish) to artwork saga
    dispatch({ type: "UPDATE_PUBLISH_DO_ARTWORK", payload: pubObject });
  };

  return (
    <div>
      <AdminNav />
      <Grid container spacing={1} direction="row">
        {editMode ? (
          <>
            {/* Edit Artwork Form */}
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

                    <FormControl className={classes.inputs}>
                      <InputLabel>Artist</InputLabel>
                      <Select
                        value={artist_id}
                        onChange={(e) => setArtistId(e.target.value)}
                      >
                        {artistList.map((artist) => (
                          <MenuItem key={artist.id} value={artist.id}>
                            {artist.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* generates sponsor options dynamically */}

                    <FormControl className={classes.inputs}>
                      <InputLabel>Sponsor</InputLabel>
                      <Select
                        value={sponsor_id}
                        onChange={(e) => setSponsorId(e.target.value)}
                      >
                        {sponsorList.map((sponsor) => (
                          <MenuItem key={sponsor.id} value={sponsor.id}>
                            {sponsor.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* generates collection options dynamically */}

                    <FormControl className={classes.inputs}>
                      <InputLabel>Collection</InputLabel>
                      <Select
                        value={collection_id}
                        onChange={(e) => setCollectionId(e.target.value)}
                      >
                        {collectionList.map((collection) => (
                          <MenuItem key={collection.id} value={collection.id}>
                            {collection.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* <ImageUpload /> */}

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

            {/* EDIT SEE FORM */}
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
                            <TableCell>
                              <Avatar
                                variant="square"
                                src={item.image}
                                alt="See Prompt Image"
                              />
                            </TableCell>
                            <TableCell>
                              <Typography noWrap="true" variant="body1">
                                {truncateString(item.prompts, 15)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <FormControlLabel
                                control={
                                  <Switch
                                    size="small"
                                    checked={item.published}
                                    onChange={(event) =>
                                      publishSee(event, item)
                                    }
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
                                  onClick={() => deleteSeeValidation(item)}
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

            {/* EDIT DO FORM */}
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
                                {truncateString(item.prompts, 15)}
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
                                  onClick={() => deleteDoValidation(item)}
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
            {/* Add Artwork Form */}
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

                    <FormControl className={classes.inputs}>
                      <InputLabel>Artist</InputLabel>
                      <Select
                        value={artist_id}
                        onChange={(e) => setArtistId(e.target.value)}
                      >
                        {artistList.map((artist) => (
                          <MenuItem key={artist.id} value={artist.id}>
                            {artist.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* generates sponsor options dynamically */}

                    <FormControl className={classes.inputs}>
                      <InputLabel>Sponsor</InputLabel>
                      <Select
                        value={sponsor_id}
                        onChange={(e) => setSponsorId(e.target.value)}
                      >
                        {sponsorList.map((sponsor) => (
                          <MenuItem key={sponsor.id} value={sponsor.id}>
                            {sponsor.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* generates collection options dynamically */}

                    <FormControl className={classes.inputs}>
                      <InputLabel>Collection</InputLabel>
                      <Select
                        value={collection_id}
                        onChange={(e) => setCollectionId(e.target.value)}
                      >
                        {collectionList.map((collection) => (
                          <MenuItem key={collection.id} value={collection.id}>
                            {collection.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* <ImageUpload /> */}

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
                  <Divider style={{ marginBottom: "5%" }} />

                  {/* Add See Form */}
                  <Typography
                    className={classes.title}
                    align="center"
                    variant="h4"
                  >
                    Add See
                  </Typography>

                  <form className={classes.form} onSubmit={addSee}>
                    <TextField
                      className={classes.inputs}
                      variant="outlined"
                      type="text"
                      placeholder="Prompt"
                      label="Prompt"
                      value={see_prompts}
                      onChange={(event) => setSeePrompts(event.target.value)}
                    />
                    <TextField
                      className={classes.inputs}
                      variant="outlined"
                      type="text"
                      placeholder="Image URL"
                      label="Image URL"
                      value={see_image}
                      onChange={(event) => setSeeImage(event.target.value)}
                    />
                    <TextField
                      className={classes.inputs}
                      variant="outlined"
                      type="text"
                      placeholder="Video URL"
                      label="Video URL"
                      value={link}
                      onChange={(event) => setLink(event.target.value)}
                    />
                    <FormControl className={classes.inputs}>
                      <InputLabel>Artwork</InputLabel>
                      <Select
                        value={artwork_id}
                        onChange={(e) => setArtworkId(e.target.value)}
                      >
                        {artworkList.map((art) => (
                          <MenuItem key={art.id} value={art.id}>
                            {art.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                  <Divider style={{ marginBottom: "5%" }} />

                  {/* Add Do Form */}
                  <Typography
                    className={classes.title}
                    align="center"
                    variant="h4"
                  >
                    Add Do
                  </Typography>
                  <form className={classes.form} onSubmit={addDo}>
                    <TextField
                      className={classes.inputs}
                      variant="outlined"
                      type="text"
                      placeholder="Prompt"
                      label="Prompt"
                      value={do_prompts}
                      onChange={(event) => setDoPrompts(event.target.value)}
                    />
                    <FormControl className={classes.inputs}>
                      <InputLabel>Artwork</InputLabel>
                      <Select
                        value={artwork_id}
                        onChange={(e) => setArtworkId(e.target.value)}
                      >
                        {artworkList.map((art) => (
                          <MenuItem key={art.id} value={art.id}>
                            {art.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                </div>
              </Card>
            </Grid>

            {/* Artwork List */}
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
  );
}

export default AdminArtwork;
