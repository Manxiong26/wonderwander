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

// for styling the page
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
  title: {
    textAlign: 'center',
    fontFamily: theme.typography.Pacifico,
    textDecoration: 'underline',
    color: theme.palette.primary.main,
    marginBottom: '2%'

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

  // local state for select, defaulted to null
  const [select, setSelected] = useState(null);

  // function to handle when the user clicks a card to vote
  const onCardClick = (event, lists) => {
    if (select === lists) {
      setSelected(null);
    } else {
      setSelected(lists);
    }
    setVoteMode(true);
    let voteClicker = 1;
    const voteCounted = {
      say_id: lists.id,
      artwork_id: id,
    }
    dispatch({ type: 'ADDING_NEW_VOTE', payload: voteCounted });
  };

  // on page load, fetch the say details and the total votes for say from the server, using the id of the artwork as the payload to get those only for that artwork
  useEffect(() => {
    dispatch({ type: 'FETCH_SAY_DETAIL', payload: id });
    dispatch({ type: 'FETCH_TOTAL_VOTE', payload: id });
  }, []);

  // to get the id of the artwork
  const { id } = useParams();

  const history = useHistory();

  return (
    <div>

      {/* takes user back to previous page */}
      <Button
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowBackIosIcon />
      </Button>
      <Grid item xs={12} sm={12} lg={12}>
        <div className={classes.pageMargin}>
          <Typography variant="h5" className={classes.title}>
            Say
          </Typography>
          <Typography variant="body1" align="center">
            <b>Go Vote!</b>
          </Typography>

          {/* if voteMode is false, render the cards with their descriptions */}
          {voteMode === false ?
            <Container className={classes.cardGrid} maxWidth="md">
              <Grid container spacing={2} >

                {/* maps through all the say cards and render them to the DOM */}
                {list.map((lists, i) => (
                  <Grid item key={lists.id} alignItems='center'>

                    {/* when a card is clicked, call the onCardClick function, passing in the lists as an argument for the specific card clicked */}
                    <CardActionArea onClick={(event) => onCardClick(event, lists)} className={classes.cardClicker}>
                      <Card className={classes.card} >
                        <CardMedia image={lists.image} className={classes.cardMedia} />
                        <CardContent className={classes.cardContent}>
                          <Typography className={classes.gamesHeader} gutterBottom variant="body1" align='center'>
                            {lists.prompts}
                          </Typography>
                        </CardContent>
                      </Card>
                    </CardActionArea>
                  </Grid>
                ))}
              </Grid>
            </Container>

            // if vote mode is true, render instead the total votes for each card
            :
            (<Container className={classes.cardGrid} maxWidth="md">
              <Grid container spacing={2}>

                {/* map through to render each card */}
                {totalVote.map((item, i) => (
                  <Grid item key={i} alignItems='center'>
                    <CardActionArea>
                      <Card className={classes.card}>
                        <CardMedia image={item.image} className={classes.cardMedia} />
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
        </div>
      </Grid>
    </div>
  );
}

export default SayPage;