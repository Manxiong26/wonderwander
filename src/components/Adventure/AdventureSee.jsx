import {
    ListItem,
    ListItemText,
    Typography,
    List,
    ListItemAvatar,
    Avatar,
    Divider
} from "@material-ui/core";
import { Card } from "@material-ui/core";
import React, { useEffect } from "react";
import { useStyles } from "../classes";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


function AdventureSee({truncateString}) {
    const list = useSelector((store) => store.adventureReducer.adventureDetailReducer);

    // constant set to value of the seeList from store
    const seeList = useSelector((store) => store.adventureSeeDo.seeAdventureReducer);
    const dispatch = useDispatch();

    //classes from the classes.js import for styling 
    const classes = useStyles();
    const history = useHistory();

    //to get the id for the see for the specific adventure page
    const { id } = useParams();

    // on page load, dispatch to the server to get the see details for the specific adventure page,
    // with the payload of the id of the specific page
    useEffect(() => {
        dispatch({ type: 'FETCH_SEE_ADVENTURE', payload: id });
    }, []);

    //for rendering the see page for the adventure 
    return (
        <>

        {/* if this adventure is supposed to have a see page, meaning that there was a see received from the server for this adventure (length > 0),
        render the see page for that adventure */}
        {(seeList.length) > 0 &&
                <List>

                    {/* map through the seeList to render it to the DOM */}
                    {seeList.map((item, i) => {
                        return (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar variant="square" src={"http://simpleicon.com/wp-content/uploads/eye_1-256x256.png"}/>
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography className={classes.content} key={i}>
                                        {truncateString(item.prompts,50)}
                                    </Typography>
                                </ListItemText>

                                {/* when clicked, takes the user to the see page from this adventure page */}
                                <ArrowForwardIosIcon
                                className={classes.nextBtn}
                                onClick={(event) => history.push(`/adventure/see/${id}`)} 
                                />
                            </ListItem>   
                        )
                    })}
                    <Divider/>
                </List>
        }
        </>
    );
}

// for exporting this component to the adventure component
export default AdventureSee;
