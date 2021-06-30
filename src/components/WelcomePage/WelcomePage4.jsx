import { useHistory } from 'react-router-dom';

//material UI
import {
    ListItemText,
    Grid,
    Divider,
    Typography,
} from "@material-ui/core";
import { useStyles } from "../classes";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import HomeIcon from '@material-ui/icons/Home';

function WelcomePage4(){
    const history = useHistory();
    const classes = useStyles();
    const goBack = () => {
        history.push('/welcome3');
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
                        <div className={classes.nextBtn}>
                        <HomeIcon
                            
                            onClick={skipWelcome}
                        /></div>
                    </div>
                    <Grid container direction="column">
                <Grid item xs={12} sm={12} lg={12}>
                    
            <div className={classes.pageMargin}>
            <Typography
                            variant="h3"
                            className={classes.title}
                        >
                            Thank You!
                        </Typography>
                <Typography variant="h5" className={classes.pageCenter}>
                Now get out there and wander!
                </Typography>
            <h2></h2>
        </div>
        </Grid>
        </Grid>
        </>
    )
}

export default WelcomePage4