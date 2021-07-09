import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import AdminNav from "../AdminNav/AdminNav";
import { useStyles } from "../classes";
import ImageUpload from "../ImageUpload/ImageUpload";

import {
  Button,
  Typography,
  TextField,
  FormControlLabel,
  Switch,
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
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function AdminCollection() {

  let { id } = useParams();

  const history = useHistory();

  const dispatch = useDispatch();

  const classes = useStyles();

  //redux store instances
  const collectionList = useSelector((store) => store.adminCollectionListReducer);
  const collection = useSelector((store) => store.adminCollectionInfoReducer);

  //retrieves collections' info from DB
  useEffect(() => {
    dispatch({ type: "FETCH_COLLECTION_LIST" });
  }, []);

  //sets local state for post request
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [bio, setBio] = useState("");
  const [donate_link, setDonateLink] = useState("");
  const [site_link, setSiteLink] = useState("");
  const [search_text, setSearchText] = useState("");

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
    };

    //dispatch to collectionList saga
    dispatch({ type: "ADD_COLLECTION", payload: newCollection });

    //alert successful post
    swal({
      text: "This collection has been added to your list!",
      icon: "success",
    });

    //updates collection list on DOM
    dispatch({ type: "FETCH_COLLECTION_LIST" });

    //clears input fields
    setName("");
    setImage("");
    setCity("");
    setState("");
    setBio("");
    setDonateLink("");
    setSiteLink("");
    setSearchText("");
  };

  //renders specific collections's details in input feilds to edit
  const renderCollectionDetail = (event, item) => {

    //sets specific collection in artist reducer
    dispatch({ type: "SET_COLLECTION_INFO", payload: item }); //

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
  };

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
    };

    //send updated collection info to collection saga
    dispatch({
      type: "UPDATE_COLLECTION_INFO",
      payload: updatedCollectionInfo,
    });

    //swal success indicator
    swal({
      text: "This Collection's information has been updated!",
      icon: "success",
    });

    //turn editMode off
    setEditMode(false);

    //clears input fields
    setName("");
    setImage("");
    setCity("");
    setState("");
    setBio("");
    setDonateLink("");
    setSiteLink("");
    setSearchText("");
  };

  //cancel (editMode) button - returns to add collection form
  const renderToInfo = () => {
    setEditMode(false);

    //clears input fields
    setName("");
    setImage("");
    setCity("");
    setState("");
    setBio("");
    setDonateLink("");
    setSiteLink("");
    setSearchText("");
  };

  //delete collection
  const deleteCollection = (id) => {

    //dispatch to saga w collection id
    dispatch({ type: "DELETE_COLLECTION", payload: id });
  };

  //alerts admin to verify collection deletion
  const deleteValidation = (id) => {

    swal({
      title: "Hello!",
      text: "Are you sure you want to PERMANENTLY delete this collection?",
      buttons: {
        cancel: true,
        confirm: "Delete",
      },
    }).then((val) => {
      if (val) {
        swal({
          text: "You've deleted this collection.",
        });
        deleteCollection(id);
      }
    });
  };

  //changes db boolean to true which "publishes" item on public facing pages
  const publish = (event, item) => {

    //sets specific artist in artist reducer
    dispatch({ type: "SET_COLLECTION_INFO", payload: item });

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
      }
    }

    //sends updated artist boolean (published/unpublished) to collection saga
    dispatch({ type: "UPDATE_PUBLISH_COLLECTION", payload: pubObject });
  };

  return (
    <>
      <AdminNav />
      <Grid container spacing={1} direction="row">
        {editMode ? (
          // Edit Collection Form
          <Grid item lg={5} sm={12} xs={12} className={classes.grid}>
            <Card elevation={6} className={classes.cardForm}>
              <div className={classes.cardContent}>
                <Typography
                  className={classes.title}
                  align="center"
                  variant="h4"
                >
                  Edit Collection
                </Typography>
                <form className={classes.form} onSubmit={updateCollectionInfo}>
                  <TextField
                    className={classes.inputs}
                    type="text"
                    placeholder="Collection Name"
                    label="Collection Name"
                    variant="outlined"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <TextField
                    className={classes.inputs}
                    type="text"
                    placeholder="Image URL"
                    label="Image URL"
                    variant="outlined"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                  />
                  <TextField
                    className={classes.inputs}
                    type="text"
                    placeholder="City"
                    label="City"
                    variant="outlined"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  />
                  <TextField
                    className={classes.inputs}
                    type="text"
                    placeholder="State"
                    label="State"
                    variant="outlined"
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                  />
                  <TextField
                    className={classes.inputs}
                    type="text"
                    placeholder="Collection Bio"
                    label="Collection Bio"
                    variant="outlined"
                    multiline
                    rows={6}
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                  />
                  <TextField
                    className={classes.inputs}
                    type="text"
                    placeholder="Donation URL"
                    label="Donation URL"
                    variant="outlined"
                    value={donate_link}
                    onChange={(event) => setDonateLink(event.target.value)}
                  />
                  <TextField
                    className={classes.inputs}
                    type="text"
                    placeholder="Website URL"
                    label="Website URL"
                    variant="outlined"
                    value={site_link}
                    onChange={(event) => setSiteLink(event.target.value)}
                  />
                  <TextField
                    className={classes.inputs}
                    type="text"
                    placeholder="Search Text"
                    label="Search Text"
                    variant="outlined"
                    value={search_text}
                    onChange={(event) => setSearchText(event.target.value)}
                  />

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
        ) : (
          // Add Collection Form
          <Grid item lg={5} sm={12} xs={12} className={classes.grid}>
            <Card elevation={6} className={classes.cardForm}>
              <div className={classes.cardContent}>
                <Typography
                  className={classes.title}
                  align="center"
                  variant="h4"
                >
                  Add Collection
                </Typography>
                <form className={classes.form} onSubmit={addCollection}>
                  <TextField
                    type="text"
                    className={classes.inputs}
                    variant="outlined"
                    placeholder="Collection Name"
                    label="Collection Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
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
                    placeholder="City"
                    label="City"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  />
                  <TextField
                    type="text"
                    className={classes.inputs}
                    variant="outlined"
                    placeholder="State"
                    label="State"
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                  />
                  <TextField
                    type="text"
                    className={classes.inputs}
                    variant="outlined"
                    placeholder="Collection Bio"
                    label="Collection Bio"
                    multiline
                    rows={6}
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                  />
                  <TextField
                    type="text"
                    className={classes.inputs}
                    variant="outlined"
                    placeholder="Donation URL"
                    label="Donation URL"
                    value={donate_link}
                    onChange={(event) => setDonateLink(event.target.value)}
                  />
                  <TextField
                    type="text"
                    className={classes.inputs}
                    variant="outlined"
                    placeholder="Website URL"
                    label="Website URL"
                    value={site_link}
                    onChange={(event) => setSiteLink(event.target.value)}
                  />
                  <TextField
                    type="text"
                    className={classes.inputs}
                    variant="outlined"
                    placeholder="Search Text"
                    label="Search Text"
                    value={search_text}
                    onChange={(event) => setSearchText(event.target.value)}
                  />

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
              </div>
            </Card>
          </Grid>
        )}

        {/* Collection List. Always shows. */}
        {/* Edit clickability renders a specific collections's details in the edit form */}
        <Grid item lg={7} sm={12} xs={12}>
          <TableContainer
            elevation={6}
            component={Card}
            className={classes.cardTable}
          >
            <div className={classes.tableContent}>
              <Typography className={classes.title} align="center" variant="h4">
                Collection List
              </Typography>
              <Table className={classes.table}>
                <TableBody>
                  {collectionList.map((item, i) => (
                    <TableRow alignItems="flex-start" key={i}>
                      <TableCell className={classes.thumbnailContainer}>
                        <img
                          src={item.image}
                          alt="Collection Image"
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
                              renderCollectionDetail(event, item)
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
      </Grid>
    </>
  );
}

export default AdminCollection;
