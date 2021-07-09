import { useHistory } from 'react-router-dom';
import {
    Grid,
    Typography,
} from "@material-ui/core";
import { useStyles } from "../classes";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import HomeIcon from '@material-ui/icons/Home';

function WelcomePage4() {
    const history = useHistory();
    const classes = useStyles();

    // when called, goes back to the previous welcome page
    const goBack = () => {
        history.push('/welcome3');
    }

    // when called, goes to the home page
    const skipWelcome = () => {
        history.push('/home');
    }

    return (
        <>

            {/* renders the buttons to the DOM */}
            <div className={classes.welcomeMargin}>
                <ArrowBackIosIcon
                    onClick={goBack}
                    className={classes.backBtn}
                />
                <HomeIcon
                    className={classes.nextBtn}
                    onClick={skipWelcome}
                />
            </div>
            <Grid container direction="column">
                <Grid item xs={12} sm={12} lg={12}>
                    <div className={classes.welcomeMargin}>
                        <Typography
                            variant="h3"
                            className={classes.title}
                        >
                            Thank You!
                        </Typography>
                        <Typography
                            variant="h5"
                            className={classes.pageCenter}>
                            Now get out there and wander!
                        </Typography>
                        <h2></h2>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default WelcomePage4;