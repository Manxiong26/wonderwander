import { useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useHistory } from 'react-router-dom';


//material UI
import {
    ListItem,
    Grid,
    Button,
    Typography,
} from "@material-ui/core";
import { useStyles } from "../classes";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SkipNextIcon from '@material-ui/icons/SkipNext';


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
        history.push('/welcome2');
    }
    const skipWelcome = () => {
        history.push('/home');
    }
    const logIn = () => {
        history.push('/login')
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_RANDOM_QUOTE' })
    }, [])

    useEffect(() => {
        dispatch({ type: 'FETCH_RANDOM_ART' })
    }, []);

    return (
        <>
            <Grid container direction="column">
                <Grid item xs={12} sm={12} lg={12}>
                    <div className={classes.pageMargin}>
                        <Button onClick={logIn}>Login</Button>
                        <SkipNextIcon
                            className={classes.nextBtn}
                            onClick={skipWelcome}
                        />
                    </div>
                    <div className={classes.pageMargin}>
                        {quote.quote === undefined ?
                            '' : (
                                <>
                                    <Typography variant="h3" className={classes.black}>
                                        Welcome
                                    </Typography>
                                    <Typography variant="h6" className={classes.title}>
                                        "{quote.quote}"
                                    </Typography>
                                    <Typography variant="h6" className={classes.title}>
                                        by {quote.quote_by}
                                    </Typography>
                                </>
                            )
                        }
                    </div>
                    <div>
                        <ListItem>
                            <img className={classes.image} src={art.image} />
                            <ArrowForwardIosIcon
                                onClick={goNext}
                                className={classes.nextBtn}
                            />
                        </ListItem>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default WelcomePage1;