import React, { useEffect, useState } from "react";
import { Card, makeStyles, CardMedia, CardContent } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";



//material UI
import {
    Grid,
    Box,
    Button,
    Divider,
    Typography,
    IconButton,
} from "@material-ui/core";
import { useStyles } from "../classes";
import VisibilityIcon from '@material-ui/icons/Visibility';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


// const useStyles = makeStyles({
//     cardmedia: {
//         maxWidth: '100%',
//     },
// })

function ImageHeader({ list }) {
    
    const classes = useStyles();
    // const list = useSelector((store) => store.artworkDetailReducer);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     console.log('In useEffect param:');
    //     dispatch({type: 'FETCH_ART_DETAIL', payload: id})
    // }, []);
    console.log('CHECKING LIST', list);
    // const {id} = useParams();
    const dispatch = useDispatch();
    const seen = () => {
        console.log('Clicked!!');
        dispatch({ type: 'ADD_ARTWORK_SEEN', payload: list })
    }

    const refreshPage = () => {
        window.location.reload(false);
    }

    const alertLogin = () => {
        alert('Please Login or Signup to access feature')
    }


    const [selected, setSelected] = React.useState(false);
    const user = useSelector(store => store.user)

    return (
        <>
<Grid container direction="column">
<Grid item xs={12} sm={12} lg={12}>
<div className={classes.pageMargin}>
<Typography variant="h5" className={classes.title}>
              Art Detail
            </Typography>
            <img
                className={classes.image}
                    src={list.artwork_image}
                /> 
                
                {user.id !== undefined ?

                    <div className={classes.center}>
                        {list.has_seen === true ?
                        <Typography variant="body1" className={classes.imageInfo}>
                        {list.artwork_name}
                        <IconButton>
                        <ToggleButton
                                value="check"
                                disabled
                                selected={selected}
                                onClick={seen}
                                onChange={() => {
                                    setSelected(!selected)
                                }}
                            >
                                Already Seen
                            </ToggleButton>
                            </IconButton>
                            </Typography>
                                 : (
                                    <>
                                    <Typography variant="body1" className={classes.imageInfo}>
                                    {list.artwork_name}
                                    <IconButton>
                                    <VisibilityIcon
                                        color="secondary"
                                        variant="contained"
                                        value="check"
                                        selected={selected}
                                        onClick={function () { refreshPage(); seen(); }}
                                        onChange={() => {
                                            setSelected(!selected)
                                        }}
                                    />
                                    </IconButton>
                                    </Typography>
                                    </>
                                    )
                        }</div>
                    : (
                        <div className="center">
                            <Typography variant="body1" className={classes.imageInfo}>
                        {list.artwork_name}
                        <IconButton>
                            <VisibilityIcon
                                color="secondary"
                                variant="contained"
                                value="check"
                                selected={selected}
                                onClick={alertLogin}
                                onChange={() => {
                                    setSelected(!selected)
                                }} /></IconButton>
                            {/* <VisibilityIcon /> */}
                            {/* </Button> */}
                       </Typography> 
                       </div>
                    )}
            </div>
            </Grid>
            </Grid>
        </>
    );
}

export default ImageHeader;

