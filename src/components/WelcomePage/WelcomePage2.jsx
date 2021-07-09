import { useHistory } from 'react-router-dom';
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

function WelcomePage2() {
    const history = useHistory();
    const classes = useStyles();

    //when called, will take user to third welcome page
    const goNext = () => {
        history.push('/welcome3');
    }

    //when called, takes user back to welcome page 1
    const goBack = () => {
        history.push('/welcome1');
    }

    // when called, skips user to home page
    const skipWelcome = () => {
        history.push('/home');
    }

    return (
        <>

            {/* renders the buttons to the dom */}
            <div className={classes.welcomeMargin}>

                {/* when clicked, goes back to page 1 */}
                <ArrowBackIosIcon
                    onClick={goBack}
                    className={classes.backBtn}
                />

                {/* when clicked, goes to next page */}
                <ArrowForwardIosIcon
                    onClick={goNext}
                    className={classes.nextBtn}
                />

                {/* when clicked, takes user to home */}
                <div className={classes.center}>
                    <HomeIcon
                        onClick={skipWelcome}
                    />
                </div>
            </div>
            <Grid container direction="column">
                <Grid item xs={12} sm={12} lg={12}>
                    <div className={classes.welcomeMargin}>
                        <Typography
                            variant="h3"
                            className={classes.red}>
                            Why
                        </Typography>
                        <Divider />
                        <p> Generating random paragraphs can be an excellent way
                            for writers to get their creative flow going at the
                            beginning of the day. The writer has no idea what
                            topic the random paragraph will be about when it
                            appears. This forces the writer to use creativity
                            to complete one of three common writing challenges.
                            The writer can use the paragraph as the first one
                            of a short story and build upon it. A second option
                            is to use the random paragraph somewhere in a short
                            story they create. The third option is to have the
                            random paragraph be the ending paragraph in a short
                            story. No matter which of these challenges is
                            undertaken, the writer is forced to use creativity
                            to incorporate the paragraph into their writing.</p>
                        <Typography
                            variant="h3"
                            className={classes.red}>
                            What
                        </Typography>
                        <Divider />
                        <p> Generating random paragraphs can be an excellent way
                            for writers to get their creative flow going at the
                            beginning of the day. The writer has no idea what
                            topic the random paragraph will be about when it
                            appears. This forces the writer to use creativity
                            to complete one of three common writing challenges.
                            The writer can use the paragraph as the first one
                            of a short story and build upon it. A second option
                            is to use the random paragraph somewhere in a short
                            story they create. The third option is to have the
                            random paragraph be the ending paragraph in a short
                            story. No matter which of these challenges is
                            undertaken, the writer is forced to use creativity
                            to incorporate the paragraph into their writing.</p>
                        <Typography
                            variant="h3"
                            className={classes.red}>
                            Benefits
                        </Typography>
                        <Divider />
                        <p> Generating random paragraphs can be an excellent way
                            for writers to get their creative flow going at the
                            beginning of the day. The writer has no idea what
                            topic the random paragraph will be about when it
                            appears. This forces the writer to use creativity
                            to complete one of three common writing challenges.
                            The writer can use the paragraph as the first one
                            of a short story and build upon it. A second option
                            is to use the random paragraph somewhere in a short
                            story they create. The third option is to have the
                            random paragraph be the ending paragraph in a short
                            story. No matter which of these challenges is
                            undertaken, the writer is forced to use creativity
                            to incorporate the paragraph into their writing.</p>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default WelcomePage2;