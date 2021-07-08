import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

//material UI
import { ListItem, Grid, Button, Typography } from "@material-ui/core";
import { useStyles } from "../classes";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import HomeIcon from "@material-ui/icons/Home";

function WelcomePage1() {

  // gets the random quote from the store
  const quote = useSelector((store) => store.randomQuote);

  // gets the random art from the store
  const art = useSelector((store) => store.randomArt);

  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  // when the next button is clicked, will take the user to the second welcome page
  const goNext = () => {
    history.push("/welcome2");
  };

  // when the skip button is clicked, will take user directly to home page, this is primarily for returning users that want to dive right back into the app
  const skipWelcome = () => {
    history.push("/home");
  };

  // on page load, makes dispatch to server to get a random quote from the server
  useEffect(() => {
    dispatch({ type: "FETCH_RANDOM_QUOTE" });
  }, []);

  // on page load, makes dispatch to the server to get a random artwork from the server
  useEffect(() => {
    dispatch({ type: "FETCH_RANDOM_ART" });
  }, []);

  // renders the welcome page to the DOM
  return (
    <>
      <div className={classes.pageMargin}>
        <div className={classes.welcomeMargin}>

          {/* button that when clicked, will go to the next welcome page */}
          <ArrowForwardIosIcon onClick={goNext} className={classes.nextBtn} />

          {/* button that when clicked, skips to the home page */}
          <div>
            <HomeIcon onClick={skipWelcome} />
          </div>
        </div>

        <Grid container direction="column">
          <Grid item xs={12} sm={12} lg={12}>

            {/* renders the random quote and the random art to dom, will render nothing if undefined which handles cases of random items not coming in properly and for the page to wait to load */}
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

              {/* button that when clicked, will take user to login page */}
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
