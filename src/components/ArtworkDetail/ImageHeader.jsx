import React, { useEffect, useState } from "react";
import { Card, makeStyles, CardMedia, CardContent, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { Button } from '@material-ui/core'

const useStyles = makeStyles({
    cardmedia: {
        maxWidth: '100%',
    },
})

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

            <Card className={classes.cardmedia}>
                <CardMedia
                    component="img"
                    image={list.artwork_image}
                >
                </CardMedia>
                {user.id !== undefined ?

                    <div className="center">
                        {list.has_seen === true ?
                            <Button
                                value="check"
                                disabled
                                selected={selected}
                                onClick={seen}
                                onChange={() => {
                                    setSelected(!selected)
                                }}
                            >Already Seen
                            </Button> : (
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    value="check"
                                    selected={selected}
                                    onClick={function () { refreshPage(); seen(); }}
                                    onChange={() => {
                                        setSelected(!selected)
                                    }}
                                ><VisibilityIcon />
                                </Button>)
                        }</div>
                    : (
                        <div className="center">
                            <Button
                                color="secondary"
                                variant="contained"
                                value="check"
                                selected={selected}
                                onClick={alertLogin}
                                onChange={() => {
                                    setSelected(!selected)
                                }}
                            ><VisibilityIcon />
                            </Button>
                        </div>
                    )}
                <CardContent>
                    <Typography>
                        Title: {list.artwork_name}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default ImageHeader;

