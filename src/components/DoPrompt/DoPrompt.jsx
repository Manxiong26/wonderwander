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

function DoPrompt() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const doDetail = useSelector((store) => store.seesaydoReducer.doReducer);
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: "FETCH_DO", payload: id });
  }, []);

  console.log("in do prompt looking for art detail information", doDetail);

  return (
      <>
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
                  {dolist.prompts}
                </Typography>
              </ListItemText>
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
