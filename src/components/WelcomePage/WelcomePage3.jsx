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

function WelcomePage3() {
    const history = useHistory();
    const classes = useStyles();
    const goNext = () => {
        history.push('/welcome4');
    }
    const goBack = () => {
        history.push('/welcome2');
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
                    /></div>
            </div>
            <Grid container direction="column">
                <Grid item xs={12} sm={12} lg={12}>
                    <div className={classes.pageMargin}>
                        <Typography
                            variant="h3"
                            className={classes.red}
                        >
                            See
                        </Typography>
                        <Divider />
                        <p>The See button will prompt you to experience a specific element of the artwork.
                            You will be asked to observe a visual component and be provided materials that will explain the creation or background of the artwork.</p>
                        <Typography
                            variant="h3"
                            className={classes.red}
                        >
                            Say
                        </Typography>
                        <Divider />
                        <p>The Say button will prompt you to vote on how the piece of artwork made you feel; what emotions the artwork evoked in you.</p>
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