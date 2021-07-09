import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
    Grid,
    Typography,
    IconButton,
} from "@material-ui/core";
import { useStyles } from "../classes";
import VisibilityIcon from '@material-ui/icons/Visibility';
import ToggleButton from '@material-ui/lab/ToggleButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

function ImageHeader({ artItem }) {

    const classes = useStyles();

    const dispatch = useDispatch();

    // handles the state for whether an item is selected by using a local state for selected, defaulted to false
    const [selected, setSelected] = React.useState(false);

    // gets the user information from the store
    const user = useSelector(store => store.user)

    // gets whether or not something is viewed, from the store
    const viewed = useSelector(store => store.viewedArt)

    // function that handles if something has been seen
    const seen = () => {

        // dispatch that sends the item to the server to handle marking an artwork as seen for the user logged in, if they are logged in
        dispatch({ type: 'ADD_ARTWORK_SEEN', payload: artItem })
    }

    const refreshPage = () => {
        window.location.reload(false);
    }

    // function that handles if the user is logged in 
    // if the user is not logged in and tries to mark an artwork as seen, will prompt them to log in or register first and prevent them from doing it
    const alertLogin = () => {
        swal({
            text: `Please Login or Register to access this feature`,
            icon: "warning",
        });
    }

    // function that checks if the artwork has been viewed by checking if the viewed item from the store has the same id as the artwork being viewed, returns true if that is the case
    const checkId = (artItem) => {
        for (let item of viewed) {
            if (artItem.id == item.artwork_id) {
                return true;
            } else {
                false;
            }
        } // end of loop
    }; // end checkId

    // render the page to the DOM
    return (
        <>
            <Typography variant="h4" className={classes.title}>
                Art Detail
            </Typography>

            <img
                className={classes.image}
                src={artItem.image}
            />

            {/* if the user id is NOT undefined, render this codeblock to the DOM */}
            {user.id !== undefined ?
                <div className={classes.center}>

                    {/* if the checkId comes back true, render a disabled "already seen" button to tell the user they already saw it */}
                    {checkId(artItem) ?
                        <Typography variant="body1" className={classes.imageInfo}>
                            <b>{artItem.name}</b>
                            <IconButton>
                                <CheckCircleIcon
                                    value="check"
                                    disabled
                                    selected={selected}
                                />
                            </IconButton>
                        </Typography>

                        // if check id comes back false, render this body of code instead, with a button to mark as seen
                        : (
                            <>
                                <Typography variant="body1" className={classes.imageInfo}>
                                    <b>{artItem.name}</b>
                                    <IconButton>
                                        <VisibilityIcon
                                            color="primary"
                                            variant="contained"
                                            value="check"
                                            selected={selected}
                                            onClick={function () { seen(); }}
                                            onChange={() => {
                                                setSelected(!selected)
                                            }}
                                        />
                                    </IconButton>
                                </Typography>
                            </>
                        )
                    }</div>

                // if the user is NOT logged in, therefore the id is undefined, render this body of code with a button that when clicked, prompts the user to sign-up or log-in
                : (
                    <div className="center">
                        <Typography variant="body1" className={classes.imageInfo}>
                            <b>{artItem.name}</b>
                            <IconButton>
                                <VisibilityIcon
                                    color="primary"
                                    variant="contained"
                                    value="check"
                                    selected={selected}
                                    onClick={alertLogin}
                                    onChange={() => {
                                        setSelected(!selected)
                                    }} />
                            </IconButton>
                        </Typography>
                    </div>
                )}
        </>
    );
}

export default ImageHeader;

