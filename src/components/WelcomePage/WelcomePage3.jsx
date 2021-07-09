import { useHistory } from 'react-router-dom';

//material UI
import {
    Grid,
    Divider,
    Typography,
} from "@material-ui/core";
import { useStyles } from "../classes";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import HomeIcon from "@material-ui/icons/Home";

function WelcomePage3() {
    const history = useHistory();
    const classes = useStyles();

    // when called, goes to 4th welcome page
    const goNext = () => {
        history.push('/welcome4');
    }

    // when called, goes back to page 2
    const goBack = () => {
        history.push('/welcome2');
    }

    //when called, skips to home page
    const skipWelcome = () => {
        history.push('/home');
    }


    return (
        <>

            {/* renders buttons to the DOM */}
            <div className={classes.welcomeMargin}>

                {/* when clicked, takes user back to previous page */}
                <ArrowBackIosIcon
                    onClick={goBack}
                    className={classes.backBtn}
                />

                {/* when clicked, takes user to next page */}
                <ArrowForwardIosIcon
                    onClick={goNext}
                    className={classes.nextBtn}
                />

                {/* when clicked, takes user to home page */}
                <div className={classes.center}>
                    <HomeIcon
                        onClick={skipWelcome}
                    /></div>
            </div>

            {/* renders the explanation of the see, say, and do elements of the app used later on the artwork detail pages */}
            <Grid container direction="column">
                <Grid item xs={12} sm={12} lg={12}>
                    <div className={classes.welcomeMargin}>
                        <Typography
                            variant="h3"
                            className={classes.red}
                        >
                            See
                        </Typography>
                        <Divider />
                        <p>The See button will prompt you to experience a specific element of the artwork.
                            You will be asked to observe a visual component and be provided materials that
                            will explain the creation or background of the artwork.</p>
                        <Typography
                            variant="h3"
                            className={classes.red}
                        >
                            Say
                        </Typography>
                        <Divider />
                        <p>The Say button will prompt you to vote on how the piece of artwork made you feel;
                            what emotions the artwork evoked in you.</p>
                        <Typography
                            variant="h3"
                            className={classes.red}
                        >
                            Do
                        </Typography>
                        <Divider />
                        <p>The Do button will prompt you to take a picture of either the artwork or you with the artwork.</p>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default WelcomePage3;