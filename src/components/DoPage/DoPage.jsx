import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  Grid,
  Typography,
  IconButton,
  Avatar,
  Button,
  Divider,
} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { useStyles } from "../classes";

function DoPage() {
  // const classes = useStyles();
  const doList = useSelector((store) => store.seesaydoReducer.doReducer);
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    console.log("In useEffect param:");
    dispatch({ type: "FETCH_DO", payload: id });
  }, []);

  return (
      <>
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
              {doList.map((item, i) => {
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
    </>
  );
}

export default DoPage;
