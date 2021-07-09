import React, { useEffect } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    Avatar,
    ListItemAvatar,
    Divider

} from "@material-ui/core";
import { useStyles } from "../classes";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

function AdventureDo({ truncateString }) {

    //classes constant from classes.js for styling
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    // for getting the doDetail for a specific adventure from the store
    const doDetail = useSelector((store) => store.adventureSeeDo.doAdventureReducer);

    // to get the id for the specific do 
    const { id } = useParams();

    // on page load, dispatch to get the do details from the server, with the payload of that id from above
    useEffect(() => {
        dispatch({ type: 'FETCH_DO_ADVENTURE', payload: id })
    }, []);

    //for rendering the adventure do page to the dom
    return (
        <>
            {/* if this adventure is supposed to have a do page, meaning that there was a do received from the server for this adventure (length > 0),
             render the do page for that adventure */}
            {(doDetail.length) > 0 &&
                <List>

                    {/* map through the doDetail and render it to the DOM */}
                    {doDetail.map((dolist, i) => {
                        return (
                            <>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar variant="square" src={"http://simpleicon.com/wp-content/uploads/camera.png"} />
                                    </ListItemAvatar>
                                    <ListItemText>
                                        <Typography className={classes.content} key={i}>
                                            {truncateString(dolist.prompts, 50)}
                                        </Typography>
                                    </ListItemText>

                                    {/* when clicked, takes the user to the do page from this adventure page */}
                                    <ArrowForwardIosIcon
                                        className={classes.nextBtn}
                                        onClick={(event) => history.push(`/adventure/do/${id}`)} />
                                </ListItem>
                            </>
                        )
                    })}
                    <Divider />
                </List>
            }
        </>
    );
}

// for exporting to Adventure component
export default AdventureDo;