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
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// for styling the page
const useStyles = makeStyles({
  cardmedia: {
    width: "60px",
    height: "60px",
  },
  content: {
    flex: "1 0 auto",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  card: {
    margin: "5px",
  },
});

function DoPrompt({truncateString}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  // gets the doDetail from the server for that artwork
  const doDetail = useSelector((store) => store.seesaydoReducer.doReducer);

  // gets the id for the artwork
  const { id } = useParams();

  // on page load, fetches the do from the server with the payload being the id for the specific artwork
  useEffect(() => {
    dispatch({ type: "FETCH_DO", payload: id });
  }, []);

  // render the page to the DOM
  return (
      <>

      {/* if the doDetail array has a length greater than 1, meaning that the artwork is supposed to have a do element, render those elements to the DOM */}
      {(doDetail.length) > 0 &&
    <List>
      {doDetail.map((dolist, i) => {
        return (
          <>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  src={"http://simpleicon.com/wp-content/uploads/camera.png"}
                />
              </ListItemAvatar>
              <ListItemText>
                <Typography className={classes.content} key={i}>
                  {truncateString(dolist.prompts, 50)}
                </Typography>
              </ListItemText>

              {/* button that takes the user to the page for the specific do prompt using the id of the do prompt */}
              <IconButton onClick={(event) => history.push(`/do/${id}`)}>
                <ArrowForwardIosIcon />
              </IconButton>
            </ListItem>
          </>
        );
      })}
      <Divider />
    </List>
        }   
    </>
  );
}

export default DoPrompt;
