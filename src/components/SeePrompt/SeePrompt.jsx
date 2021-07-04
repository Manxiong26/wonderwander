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

  console.log("IN SEE PROMPT", seelist);

  return (
    // {list && list.name && editMode?}
    <>
    {(seelist.length) > 0 &&
      <List>
        {seelist.map((seel, i) => {
          return (
            <>
            {/* <Divider/> */}
              <ListItem>
                <ListItemAvatar>
                  <Avatar variant="square" src={"http://simpleicon.com/wp-content/uploads/eye_1-256x256.png"} />
                </ListItemAvatar>
                <ListItemText>
                  <Typography className={classes.content} key={seel.id}>
                    {truncateString(seel.prompts, 50)}
                  </Typography>
                </ListItemText>
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
