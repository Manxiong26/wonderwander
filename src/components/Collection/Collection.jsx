import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Collection.css'

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

  const history = useHistory();

  const dispatch = useDispatch();

  //initialize to the DOM
  useEffect(() => {
    dispatch({ type: 'FETCH_COLLECTION' })
  }, []);

  //collection Store reducer
  const collectionList = useSelector((store) => store.collection);

  // function that when called, will take the user to the collection detail for a specific collection, passed in as the argument collDet
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

      {/* button that when clicked, will take the user back to the previous page */}
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

          {/* maps through the whole collection list and renders them to the DOM */}
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

                  {/* button that when clicked, will call the viewCollectionDetail function and pass in the collection item as an argument */}
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