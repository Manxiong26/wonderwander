import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Collection.css'

//material UI
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  Divider,
  Typography,
  IconButton,
} from "@material-ui/core";
import { useStyles } from "../classes";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function Collection() {
  const classes = useStyles();
  //this pushes to the next page
  const history = useHistory();
  //this dispatch the saga
  const dispatch = useDispatch();

  //initialize to the DOM
  useEffect(() => {
    dispatch({ type: 'FETCH_COLLECTION' })
  }, []);

  //collection Store reducer
  const collectionList = useSelector((store) => store.collection);
  console.log('WHAT IS IN COLLECTION__________', collectionList);

  const viewCollectionDetail = (event, collDet) => {
    history.push(`/collectionDetail/${collDet.id}`)
  }
  const collectionText = (collection) => {
    <>
      {collection.city}, {collection.state}
    </>
  }
  return (
    <>
      <Button
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowBackIosIcon />
      </Button>
      <div className={classes.pageMargin}>
        <Typography variant="h5" className={classes.title}>
          All Collections
        </Typography>
        <List>
          {/* <div className="collectionList"> */}
          {collectionList.map(collection => {
            return (
              <>
                <Divider />
                <ListItem key={collection.id}>
                  <ListItemAvatar>
                    <Avatar className={classes.thumbnail} src={collection.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={collection.name}
                    secondary={collectionText(collection)}
                  />
                  <ListItemText />
                  <IconButton>
                    <ArrowForwardIosIcon
                      onClick={(event) =>
                        viewCollectionDetail(event, collection)
                      }
                      className={classes.nextBtn}
                    />
                  </IconButton>
                </ListItem >
              </>
            )
          })}
          <Divider />
        </List>
      </div></>
  )
}

export default Collection;