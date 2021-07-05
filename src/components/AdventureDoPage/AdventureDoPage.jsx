import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  Card,
  Grid,
  Typography,
  IconButton,
  Avatar,
  Button,
  Divider,
} from "@material-ui/core";
import { useStyles } from "../classes";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

function AdventureDoPage() {
  // const classes = useStyles();
  const list = useSelector((store) => store.adventureSeeDo.doAdventureReducer);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    console.log("In useEffect param:");
    dispatch({ type: "FETCH_DO_ADVENTURE", payload: id });
  }, []);
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.pageMargin}>
      <Button
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowBackIosIcon />
      </Button>
      <Grid container direction="column">
        <Grid item xs={12} sm={12} lg={12}>
          <div className={classes.pageMargin}>
            <Typography variant="h5" className={classes.title}>
              Do
            </Typography>
            <Card className={classes.promptCard}>
              <div style={{ position: "relative" }}>
                {list.map((item, i) => {
                  return (
                    <>
                      <Typography
                        variant="body1"
                        className={classes.cardContent}
                        key={i}
                      >
                        <b>{item.prompts}</b>
                      </Typography>
                      <Divider />
                    </>
                  );
                })}
                <Button
                  size="small"
                  variant="contained"
                  className={classes.cameraBtn}
                >
                  <Avatar
                    variant="square"
                    src={"http://simpleicon.com/wp-content/uploads/camera.png"}
                  />
                </Button>
              </div>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdventureDoPage;
