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
      height: '180px',
      width: '180px',
      display: 'inline-block',
      flexDirection: 'column',
    },
    cardMedia: {
      // paddingTop: '100%', // 16:9
      height: '60px',
      width: '60px',
      margin: 'auto',
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
    button: {
      justifyContent: 'center',
    },
    cardClicker: {
      mouseEvent: 'onClick',
    },
  }));





function SayPage() {
    const classes = useStyles();
    // const history = useHistory();
    const list = useSelector((store) => store.seesaydoReducer.sayReducer);
    const dispatch = useDispatch();
    const [voteMode, setVoteMode] = useState(false);

    const handleVote = () => {
      console.log(handleVote);
      setVoteMode(true);
    }

    const [clickedVote, setClickedVote] = useState(null);
    const [bgColor, setBgColor] = useState(null);

    const voteClick = function(key) {
      setClickedVote(key);
      setBgColor(light.palette.secondary.main);
    }

    const[isLike, setIsLike] = useState(false);

const colorStyle = {color:"blue"}

const handleClick = () => {
    setIsLike(!isLike);
}
    
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
          {voteMode === false ?
          <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={2} >
                {list.map((lists, i) => (
                    <Grid item  key={i} alignItems='center' >
                    <CardActionArea onClick={handleClick} style={isLike ? colorStyle : null}>
                        <Card className={classes.card} >
                            <CardMedia image={lists.image} className={classes.cardMedia}/>
                            <CardContent className={classes.cardContent}>
                                <Typography className={classes.gamesHeader}  gutterBottom variant="h5" component="h5" align='center'>
                                {lists.prompts}
                                </Typography>
                            </CardContent>    
                        </Card>
                    </CardActionArea>
                    </Grid>
                    ))}
                </Grid>
            </Container>
          :
          (<Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={2}>
          {list.map((lists, i) => (
              <Grid item key={i} alignItems='center'>
              <CardActionArea>
                  <Card className={classes.card}>
                      <CardMedia image={lists.image} className={classes.cardMedia}/>
                      <CardContent className={classes.cardContent}>
                          <Typography className={classes.gamesHeader} gutterBottom variant="h5" component="h5" align='center'>
                          Vote Count: 
                          </Typography>
                      </CardContent>    
                  </Card>
              </CardActionArea>
              </Grid>
              ))}
          </Grid>
      </Container>)  
          }
            {voteMode === false ?
            <Button className={classes.button} variant="contained" color="primary" onClick={handleVote} >
                Vote!
            </Button>
            :
            (<Button variant="contained" color="primary" >Back</Button>)
            }

        </div>
    );
}

export default SayPage;