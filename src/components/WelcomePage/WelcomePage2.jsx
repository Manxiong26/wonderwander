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

function WelcomePage2() {
    const history = useHistory();
    const classes = useStyles();
    const goNext = () => {
        history.push('/welcome3');
    }
    const goBack = () => {
        history.push('/welcome1');
    }
    const skipWelcome = () => {
        history.push('/home');
    }


    return (
        <>
            <div className={classes.pageMargin}>
                <ArrowBackIosIcon
                    onClick={goBack}
                    className={classes.backBtn}
                />
                <ArrowForwardIosIcon
                    onClick={goNext}
                    className={classes.nextBtn}
                />
                <div className={classes.center}>
                    <SkipNextIcon
                        onClick={skipWelcome}
                    />
                </div>
            </div>
            <Grid container direction="column">
                <Grid item xs={12} sm={12} lg={12}>
                    <div className={classes.pageMargin}>
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
                            </p>
                        <Divider />
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
                            appears. </p>
                        <Divider />
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
                            </p>
                        <Divider />
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default WelcomePage2;