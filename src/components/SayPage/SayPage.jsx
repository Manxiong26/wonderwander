import React, { useEffect } from "react";
import { CardContent, Card, IconButton, Typography, CardMedia, makeStyles, Container, Grid, Button, } from "@material-ui/core";
import CardActionArea from '@material-ui/core/CardActionArea';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";


const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    card: {
      height: '50%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '100%', // 16:9
      height: 0,
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
    AppBar: {
      backgroundColor: 'transparent',
    },
    gamesHeader: {
      color: '#000000',
    },
    cardAction: {

    },
  }));





function SayPage() {
    const classes = useStyles();
    // const history = useHistory();
    const list = useSelector((store) => store.seesaydoReducer.sayReducer);
    const dispatch = useDispatch();
    
    // // This is where we update and insert into the db
    // const [say_id, setSay_Id] = useState('');
    // const [artwork_id, setArtwork_Id] = useState('');


    // //This saves the vote
    // const saveVote = () => {
    //     const voteCompleted = {
    //         say_id: list.id,
    //         artwork_id: artwork_id.id,
    //     }
    //     console.log('updated the vote:', voteCompleted);
    //     dispatch({type: 'UPDATE_VOTE', payload: voteCompleted});
    // }



    useEffect(() => {
        console.log('In useEffect param:', list);
        dispatch({type: 'FETCH_SAY_DETAIL'})
    }, []);
    console.log('In useEffect param:', list);
    // const {id} = useParams();
    console.log(list);

    return (
        <div>
            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={10}>
                {list.map((lists, i) => (
                    <Grid item key={i} xs={12} sm={6} md={4}>
                    <CardActionArea>
                        <Card className={classes.card}>
                            <CardMedia image={lists.image} className={classes.cardMedia}/>
                            <CardContent className={classes.cardContent}>
                                <Typography className={classes.gamesHeader} gutterBottom variant="h5" component="h2" align='center'>
                                {lists.prompts}
                                </Typography>
                            </CardContent>    
                        </Card>
                    </CardActionArea>
                    </Grid>
                    ))}
                </Grid>
            </Container>
            <Button  variant="contained" color="primary">
                Vote!
            </Button>
        </div>
    );
}

export default SayPage;