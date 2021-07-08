import React, { useEffect } from 'react';
import {
    Card,
  Grid,
  Typography,
  IconButton,
  Avatar,
  Button,
  Divider,
} from "@material-ui/core";
import { useStyles } from "../classes";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
import ReactPlayer from 'react-player';



function SeePage() {
    const seeList = useSelector((store) => store.seesaydoReducer.seeReducer);
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        console.log('In useEffect param:');
        dispatch({ type: 'FETCH_SEE_DETAIL', payload: id })
    }, []);


    console.log('Checking seeList ', seeList);


    return (<>
        <div className={classes.welcomeMargin}>
            <Button
                onClick={() => {
                    history.goBack();
                }}
            >
                <ArrowBackIosIcon />
            </Button>
        </div>

       <Grid container direction="column">
      <Grid item xs={12} sm={12} lg={12}>
        <div className={classes.pageMargin}>
        <Typography variant="h5" className={classes.title}>
            See
          </Typography>
          
            {seeList.map((item, i) => {
                return (
                    <Card style={{marginBottom: '3%'}}>
                    <div key={i} className={classes.cardContent}>
                        
                        <ReactPlayer
                            url={item.link} controls="true" width="75%" height="100%" className={classes.reactPlayer} />
                       
                        <Typography align="center" variant="body1" className={classes.caption}>
                            {item.prompts}
                        </Typography>
                        {/* <img src={item.image} />  */}

                        </div>
                        </Card>
                )
            })}
           
        </div>
        </Grid>
        </Grid>
    </>
    );
}


// artwork_vidlink
export default SeePage;