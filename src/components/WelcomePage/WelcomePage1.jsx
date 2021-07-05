import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//material UI
import { ListItem, Grid, Button, Typography } from "@material-ui/core";
import { useStyles } from "../classes";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import HomeIcon from "@material-ui/icons/Home";

function WelcomePage1() {
  const quote = useSelector((store) => store.randomQuote);
  const art = useSelector((store) => store.randomArt);
  console.log(quote);
  console.log(art);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  console.log(quote[0]);

  const goNext = () => {
    history.push("/welcome2");
  };
  const skipWelcome = () => {
    history.push("/home");
  };
  const logIn = () => {
    history.push("/login");
  };

  useEffect(() => {
    dispatch({ type: "FETCH_RANDOM_QUOTE" });
  }, []);

  useEffect(() => {
    dispatch({ type: "FETCH_RANDOM_ART" });
  }, []);

  return (
    <>
      <div className={classes.pageMargin}>
        <div className={classes.welcomeMargin}>
          <ArrowForwardIosIcon onClick={goNext} className={classes.nextBtn} />
          <div>
            <HomeIcon onClick={skipWelcome} />
          </div>
        </div>

        <Grid container direction="column">
          <Grid item xs={12} sm={12} lg={12}>
            <div className={classes.welcomeMargin}>
              {quote.quote === undefined ? (
                ""
              ) : (
                <>
                  <Typography variant="h3" className={classes.title}>
                    Welcome
                  </Typography>
                  <Typography
                    variant="h6"
                    style={{ marginTop: "10%" }}
                    className={classes.center}
                  >
                    "{quote.quote}"
                  </Typography>
                  <Typography variant="body1" className={classes.center}>
                    by <b>{quote.quote_by}</b>
                  </Typography>
                </>
              )}
            </div>
            <div>
              <ListItem>
                <img className={classes.image} src={art.image} />
              </ListItem>
            </div>
            <div style={{ display: "flex" }}>
              <Button
                variant="outlined"
                color="primary"
                type="button"
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "20%",
                }}
                onClick={() => {
                  history.push("/login");
                }}
              >
                Login
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default WelcomePage1;
