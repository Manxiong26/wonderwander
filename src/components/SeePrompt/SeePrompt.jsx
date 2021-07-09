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
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function SeePrompt({truncateString}) {
  const classes = useStyles();
  const history = useHistory();
  const list = useSelector((store) => store.artworkDetailReducer);
  const seelist = useSelector((store) => store.seesaydoReducer.seeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("In useEffect param:");
    dispatch({ type: "FETCH_ART_DETAIL", payload: id });
    dispatch({ type: "FETCH_SEE_DETAIL", payload: id });
  }, []);

  const { id } = useParams();


  return (
    <>

    {/* if the length of the see list is over 0, so that the artwork is supposed to have see attached to it, then it will render the seeList to the DOM */}
    {(seelist.length) > 0 &&
      <List>

        {/* renders the see list to the DOM */}
        {seelist.map((seel, i) => {
          return (
            <>
              <ListItem>
                <ListItemAvatar>
                  <Avatar variant="square" src={"http://simpleicon.com/wp-content/uploads/eye_1-256x256.png"} />
                </ListItemAvatar>
                <ListItemText>
                  <Typography className={classes.content} key={seel.id}>
                    {truncateString(seel.prompts, 50)}
                  </Typography>
                </ListItemText>

                {/* takes user to the specific see pages */}
                <IconButton onClick={(event) => history.push(`/see/${id}`)}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </ListItem>
              <Divider/>
            </>
          );
        })}
      </List>
    }
    </>
  );
}

export default SeePrompt;
