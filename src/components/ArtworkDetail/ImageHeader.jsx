import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";



//material UI
import {
    Grid,
    Typography,
    IconButton,
} from "@material-ui/core";
import { useStyles } from "../classes";
import VisibilityIcon from '@material-ui/icons/Visibility';
import ToggleButton from '@material-ui/lab/ToggleButton';


// const useStyles = makeStyles({
//     cardmedia: {
//         maxWidth: '100%',
//     },
// })

function ImageHeader({ artItem }) {

    const classes = useStyles();
  
    console.log('Art Detail: ', artItem);
    const dispatch = useDispatch();

    const seen = () => {
        console.log('Clicked!!');
        dispatch({ type: 'ADD_ARTWORK_SEEN', payload: list })
    }

    const refreshPage = () => {
        window.location.reload(false);
    }

    const alertLogin = () => {
        swal({
            text: `Please Login or Register to access this feature`,
            icon: "warning",
          });
    }


    const [selected, setSelected] = React.useState(false);
    const user = useSelector(store => store.user)

    return (
        <>
        

            <Typography variant="h4" className={classes.title}>
                Art Detail
            </Typography>
            <img
                className={classes.image}
                src={artItem.image}
            />

            {/* {user.id !== undefined ?

                <div className={classes.center}>
                    {artItem.has_seen === true ?
                        <Typography variant="body1" className={classes.imageInfo}>
                            {artItem.artwork_name}
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
                                    {artItem.artwork_name}
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
                : ( */}
                    <div className="center">
                        <Typography variant="body1" className={classes.imageInfo}>
                            {artItem.name}
                            <IconButton>
                                <VisibilityIcon
                                    color="secondary"
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
                {/* )} */}
        </>
    );
}

export default ImageHeader;

