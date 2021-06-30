import { useEffect } from 'react';
import {useDispatch, useSelector, } from 'react-redux';
import { useHistory } from 'react-router-dom';


//material UI
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Grid,
    Box,
    Button,
    Divider,
    Typography,
    IconButton,
  } from "@material-ui/core";
  import { useStyles } from "../classes";
  import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

function WelcomePage1(){
    const quote = useSelector((store) => store.randomQuote);
    const art = useSelector((store) => store.randomArt);
    console.log(quote);
    console.log(art);
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    console.log(quote[0]);

    const goNext = () => {
        history.push('/welcome2');
    }
    const skipWelcome = () => {
        history.push('/home');
    }

    useEffect(() => {
        dispatch({type: 'FETCH_RANDOM_QUOTE'})
    }, [])
    
    useEffect(() => {
        dispatch({type: 'FETCH_RANDOM_ART'})
    }, []);

    return (
        <>
        {quote.quote === undefined ?
        '' : (
            <Grid container direction="column">
            <Grid item xs={12} sm={12} lg={12}>
              <div className={classes.pageMargin}>
              <Typography variant="h3" className={classes.red}>
              Welcome
            </Typography>
            <Typography variant="h6" className={classes.title}>
              "{quote.quote}"
            </Typography>
            <Typography variant="h6" className={classes.title}>
                by {quote.quote_by}
            </Typography>
            <p>
              <img className={classes.image} src={art.image} />
            </p>
            <div>
            <List>
            <ListItem>
                <button>Go to login</button>
                        <button onClick={skipWelcome}>Skip</button>
                        <IconButton >
                          <ArrowForwardIosIcon
                            onClick={goNext}
                            className={classes.nextBtn}
                          />
                        </IconButton>
                      </ListItem>
                      </List>
                      </div>
                      </div>
            </Grid>
            </Grid>
        )
        }
        </>
    );
}

export default WelcomePage1;