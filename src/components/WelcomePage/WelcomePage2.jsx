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
            <Grid container direction="column">
                <Grid item xs={12} sm={12} lg={12}>
                    <div className={classes.pageMargin}>
                        <SkipNextIcon
                            className={classes.nextBtn}
                            onClick={skipWelcome}
                        />
                    </div>
                    <div className={classes.pageMargin}>

                        <Typography
                            variant="h3"
                            className={classes.title}
                        >
                            Why
                        </Typography>
                        <Divider />
                        <ListItemText 
                            className={classes.center}
                            primary="Why this App!"
                            secondary="Why this App!!"/>
                        <Divider />
                        <Typography
                            variant="h3"
                            className={classes.title}
                        > What 
                        
                        </Typography>
                        <ArrowBackIosIcon
                            onClick={goBack}
                            className={classes.backBtn}
                        /> 
                        <ArrowForwardIosIcon
                            onClick={goNext}
                            className={classes.nextBtn}
                        />
                        <Divider />
                        <ListItemText 
                            className={classes.center}
                            primary="What is This App!"
                            secondary="What is This App!!"/>
                        <Divider />
                        <Typography
                            variant="h3"
                            className={classes.title}>
                            Benefits
                        </Typography>
                        <Divider />
                        <ListItemText 
                            className={classes.center}
                            primary="Benefits of This App!"
                            secondary="Benefits of This App!!"/>
                        <Divider />
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default WelcomePage2