import React, { useEffect } from "react";
import {
  List,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Typography,
  Divider,
  makeStyles,
} from "@material-ui/core";
import { useStyles } from "../classes";
import { useHistory, useParams } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

function SayPrompt() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const list = useSelector((store) => store.seesaydoReducer.sayReducer);

  //on page load, fetches the details from the server, using the id of the artwork as the payload to get the say for that artwork
  useEffect(() => {
    dispatch({ type: "FETCH_SAY_DETAIL", payload: id });
  }, []);

  // to get id of artwork
  const { id } = useParams();

  // render the page to the dom
  return (
    <>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              variant="square"
              src={"http://cdn.onlinewebfonts.com/svg/img_464398.png"}
            />
          </ListItemAvatar>
          <ListItemText>
            <Typography className={classes.content}>
              What did you think of this piece? Go Vote!
            </Typography>
          </ListItemText>
          <IconButton onClick={() => history.push(`/say/${id}`)}>
            <ArrowForwardIosIcon />
          </IconButton>
        </ListItem>
      </List>
    </>
  );
}

export default SayPrompt;
