import React, { useEffect } from "react";
import { CardContent, Card, IconButton, Typography, CardMedia, makeStyles, Container, Grid, Button, } from "@material-ui/core";
import CardActionArea from '@material-ui/core/CardActionArea';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import './SayPage.css';


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
      background: props => props.lists ? 'linear-gradient(#e66465, #9198e5)' : 'linear-gradient(#e66465, #9198e5)',
    },
  }));


  function SayPage() {
    
    const classes = useStyles();
    // const history = useHistory();
    const list = useSelector((store) => store.seesaydoReducer.sayReducer);
    const totalVote = useSelector((store) => store.voteNumber);
    // const addVote = useSelector((store) => store.addVote);
    const dispatch = useDispatch();
    const [voteMode, setVoteMode] = useState(false);
 
    console.log('voteCount', totalVote);
    // console.log('Testing addVote reducer', addVote);

    // const handleVote = () => {
    //   console.log(handleVote);
    //   setVoteMode(true);
    //   let voteClicker = 1;
    //   console.log('voteclicker', voteClicker);
    //   const voteCounted = {
    //     say_id: say_id,
    //     artwork_id: id,
    //   }
    //   console.log('testing handlevote', voteCounted);
    //   dispatch({type: 'ADDING_NEW_VOTE', payload: voteCounted});
    // }

    // This is where we update and insert into the db
    // const [say_id, setSay_Id] = useState('');
    // const [artwork_id, setArtwork_Id] = useState('');

  const [select, setSelected] = useState(null);

  
  const onCardClick = (event, lists) => {
    if (select === lists) {
        setSelected(null);
    } else {
      setSelected(lists);
    }
    console.log(lists); 

      setVoteMode(true);
      let voteClicker = 1;
      console.log('voteclicker', voteClicker);
      const voteCounted = {
        say_id: lists.id,
        artwork_id: id,
      }
      console.log('testing handlevote', voteCounted);
      dispatch({type: 'ADDING_NEW_VOTE', payload: voteCounted});
    // console.log('clicked card', list);
 };
  // onClick={() => setSelected(lists.sayid)} className={select && select !== lists.sayid ? 'bg-disabled' : null}
  
    useEffect(() => {
        console.log('In useEffect param:');
        dispatch({type: 'FETCH_SAY_DETAIL', payload: id});
        dispatch({type: 'FETCH_TOTAL_VOTE', payload: id});
    }, []);
  
    console.log('In useEffect param:', list);
    const {id} = useParams();
    console.log('testing22222', totalVote);
    // console.log('Testing addVote reducer 2222222', addVote);
  
    return (
        <div>
          {voteMode === false ?
          <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={2} >
                {list.map((lists, i) => (
                    <Grid item  key={lists.id} alignItems='center'>
                      
                    <CardActionArea  onClick={(event) => onCardClick(event, lists)} className={classes.cardClicker}>
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
          {totalVote.map((lists, i) => (
              <Grid item key={i} alignItems='center'>
              <CardActionArea>
                  <Card className={classes.card}>
                      <CardMedia image={lists.image} className={classes.cardMedia}/>
                      <CardContent className={classes.cardContent}>
                          <Typography item key={lists.say_id} className={classes.gamesHeader} gutterBottom variant="h5" component="h5" align='center'>
                          Vote Count: {lists.count} 
                          </Typography>
                      </CardContent>    
                  </Card>
              </CardActionArea>
              </Grid>
              ))}
          </Grid>
      </Container>)  
          }
            {/* {voteMode === false ?
            <Button className={classes.button} variant="contained" color="primary" >
                Vote!
            </Button>
            :
            (<Button variant="contained" color="primary" >Back</Button>)
            }
   */}
        </div>
    );
  }
  
  export default SayPage;