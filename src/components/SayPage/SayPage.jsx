import React, { useEffect } from "react";
import { 
  CardContent, 
  Card, 
  IconButton, 
  Typography, 
  CardMedia, 
  makeStyles, 
  Container, 
  Grid, 
  Button, 
} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CardActionArea from '@material-ui/core/CardActionArea';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
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
      height: '60px',
      width: '60px',
      margin: 'auto',
      marginTop: '10%',

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
      textAlign: 'center',
    },
    cardClicker: {
      // background: props => props.lists ? 'linear-gradient(#e66465, #9198e5)' : 'linear-gradient(#e66465, #9198e5)',
    },
    title: {
      textAlign: 'center',
      fontFamily: theme.typography.Pacifico,
      textDecoration: 'underline',
      color: theme.palette.primary.main,
      marginBottom: '2%'
  
    },
    pageMargin: {
      marginLeft: '6%',
      marginRight: '6%',
    },


  }));


  function SayPage() {
    
    const classes = useStyles();
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
      dispatch({type: 'FETCH_SAY_DETAIL', payload: id});
      dispatch({type: 'FETCH_TOTAL_VOTE', payload: id});
  }, []);

    // ---REDUCERS--- //
    const list = useSelector((store) => store.seesaydoReducer.sayReducer);
    const totalVote = useSelector((store) => store.voteNumber);

    // ---Local State--- //
    const [voteMode, setVoteMode] = useState(false);
    const [select, setSelected] = useState(null);

  
  const onCardClick = (event, lists) => {
    if (select === lists) {
        setSelected(null);
    } else {
      setSelected(lists);
    }

      setVoteMode(true);
      let voteClicker = 1;
      console.log('voteclicker', voteClicker);
      const voteCounted = {
        say_id: lists.id,
        artwork_id: id,
      }
      dispatch({type: 'ADDING_NEW_VOTE', payload: voteCounted});
 };
  
  
    return (
      <>
      <div className={classes.pageMargin}>

            <Button
                onClick={() => {
                    history.goBack();
                }}
            >
                <ArrowBackIosIcon />
            </Button>
            </div>
            <div>
            <Grid item xs={12} sm={12} lg={12}>
          <Typography variant="h5" className={classes.title}>
            Say
          </Typography>
          <Typography variant="body1" align="center">
            <b>Go Vote!</b>
          </Typography>
          {voteMode === false ?
          <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={2} >
                {list.map((lists, i) => (
                    <Grid item  key={lists.id} alignItems='center'>
                      
                    <CardActionArea  onClick={(event) => onCardClick(event, lists)} className={classes.cardClicker}>
                        <Card className={classes.card} >
                            <CardMedia image={lists.image} className={classes.cardMedia}/>
                            <CardContent className={classes.cardContent}>
                                <Typography className={classes.gamesHeader}  gutterBottom variant="body1" align='center'>
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
          {totalVote.map((item, i) => (
              <Grid item key={i} alignItems='center'>
              <CardActionArea>
                  <Card className={classes.card}>
                      <CardMedia image={item.image} className={classes.cardMedia}/>
                      <CardContent className={classes.cardContent}>
                          <Typography item key={item.say_id} className={classes.gamesHeader} gutterBottom variant="body1" align='center'>
                          Vote Count: {item.count} 
                          </Typography>
                      </CardContent>    
                  </Card>
              </CardActionArea>
              </Grid>
              ))}
          </Grid>
      </Container>)  
          }
        </Grid>
        </div>
        </>
    );
  }
  
  export default SayPage;