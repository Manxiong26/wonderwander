import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import AdminNav from "../AdminNav/AdminNav";
import { useStyles } from "../classes";

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
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function AdminSponsor() {
  let { id } = useParams();
  //console.log(id);

  //functionality to route to a page
  const history = useHistory();

  const classes = useStyles();

  //functionality to dispatch information to a saga or reducer
  const dispatch = useDispatch();

  //redux store instances
  const sponsorList = useSelector((store) => store.adminSponsorListReducer);
  const sponsor = useSelector((store) => store.adminSponsorInfoReducer);
  console.log("sponsor reducer id:", sponsor.id);

  //retrieves sponsors' info from DB
  useEffect(() => {
    dispatch({ type: "FETCH_SPONSOR_LIST" });
  }, []);

  //sets local state for post request
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [description, setDescription] = useState("");
  const [site_link, setSiteLink] = useState("");

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
    };

    //dispatch to sponsorList saga
    dispatch({ type: "ADD_SPONSOR", payload: newSponsor });

    //alert successful post
    swal({
      text: "This sponsor has been added to your list!",
      icon: "success",
    });

    //updates artist list on DOM
    dispatch({ type: "FETCH_SPONSOR_LIST" });

    //clears input fields
    setName("");
    setLogo("");
    setDescription("");
    setSiteLink("");
  };

  //renders specific sponsor's details in input feilds to edit
  const renderSponsorDetail = (event, item) => {
    console.log("clicking edit for Sponsor = ", item);

    //sets specific sponsor in sponsor reducer
    dispatch({ type: "SET_SPONSOR_INFO", payload: item }); //

    //renders form view from add to edit mode
    setEditMode(true);

    //shows specific artist's details in input fields for editing
    setName(item.name);
    setLogo(item.logo);
    setDescription(item.description);
    setSiteLink(item.site_link);
  };

  //update (edit) sponsor information
  const updateSponsorInfo = () => {
    //create updated sponsor object
    const updatedSponsorInfo = {
      id: sponsor.id,
      name: name,
      logo: logo,
      description: description,
      site_link: site_link,
    };

    console.log("updated sponsor info:", updatedSponsorInfo);

    //send updated sponsor info to sponsor saga
    dispatch({ type: "UPDATE_SPONSOR_INFO", payload: updatedSponsorInfo });

    //swal success indicator
    swal({
      text: "This sponsor's information has been updated!",
      icon: "success",
    });

    //turn editMode off
    setEditMode(false);

    //clears input fields
    setName("");
    setLogo("");
    setDescription("");
    setSiteLink("");
  };

  //cancel (editMode) button - returns to add sponsor form
  const renderToInfo = () => {
    setEditMode(false);

    //clears input fields
    setName("");
    setLogo("");
    setDescription("");
    setSiteLink("");
  };

  //delete sponsor
  const deleteSponsor = (id) => {
    console.log("deleting sponsor:", id);

    //dispatch to saga w sponsor id
    dispatch({ type: "DELETE_SPONSOR", payload: id });
  };

  //alerts admin to verify sponsor deletion
  const deleteValidation = (id) => {
    console.log("delete clicked! id = ", id);

    swal({
      title: "Hello!",
      text: "Are you sure you want to PERMANENTLY delete this sponsor?",
      buttons: {
        cancel: true,
        confirm: "Delete",
      },
    }).then((val) => {
      if (val) {
        swal({
          text: "You've deleted this sponsor.",
        });
        deleteSponsor(id);
      }
    });
  };

  return (
    <div>
      <AdminNav />
      <Grid container spacing={1} direction="row">
        {editMode ? (
          <Grid item lg={5} className={classes.grid}>
            <Card elevation={6} className={classes.cardForm}>
              <div className={classes.cardContent}>
                <Typography
                  className={classes.title}
                  align="center"
                  variant="h4"
                >
                  Edit Sponsor
                </Typography>
                <form className={classes.form} onSubmit={updateSponsorInfo}>
                  <TextField
                    type="text"
                    className={classes.inputs}
                    variant="outlined"
                    placeholder="Sponsor Name"
                    label="Sponsor Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <TextField
                    type="text"
                    className={classes.inputs}
                    variant="outlined"
                    placeholder="Sponsor Logo"
                    label="Sponsor Logo"
                    value={logo}
                    onChange={(event) => setLogo(event.target.value)}
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
                    placeholder="Website URL"
                    label="Website URL"
                    value={site_link}
                    onChange={(event) => setSiteLink(event.target.value)}
                  />
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
          <Grid item lg={5} className={classes.grid}>
            <Card elevation={6} className={classes.cardForm}>
              <div className={classes.cardContent}>
                <Typography
                  className={classes.title}
                  align="center"
                  variant="h4"
                >
                  Add Sponsor
                </Typography>
                <form className={classes.form} onSubmit={addSponsor}>
                  <TextField
                    type="text"
                    className={classes.inputs}
                    variant="outlined"
                    placeholder="Sponsor Name"
                    label="Sponsor Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <TextField
                    type="text"
                    className={classes.inputs}
                    variant="outlined"
                    placeholder="Logo URL"
                    label="Logo URL"
                    value={logo}
                    onChange={(event) => setLogo(event.target.value)}
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
                    placeholder="Website URL"
                    label="Website URL"
                    value={site_link}
                    onChange={(event) => setSiteLink(event.target.value)}
                  />
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

        {/* Sponsor List. Always shows. */}
        {/* Edit clickability renders a specific sponsor's details in the edit form */}
        <Grid item lg={7}>
          <TableContainer
            elevation={6}
            component={Card}
            className={classes.cardTable}
          >
            <div className={classes.tableContent}>
              <Typography className={classes.title} align="center" variant="h4">
                Sponsor List
              </Typography>
              <Table className={classes.table}>
                <TableBody>
                  {sponsorList.map((item, i) => (
                    <TableRow alignItems="flex-start" key={i}>
                      <TableCell>
                        <img
                          src={item.logo}
                          alt="Sponsor Logo"
                          className={classes.thumbnail}
                        />
                      </TableCell>

                      <TableCell>
                        <Typography variant="body1">{item.name}</Typography>
                      </TableCell>
                      
                      <TableCell align="right">
                        <IconButton>
                          <EditIcon
                            className={classes.btn}
                            variant="outlined"
                            onClick={(event) => renderSponsorDetail(event, item)}
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

export default AdminSponsor;
