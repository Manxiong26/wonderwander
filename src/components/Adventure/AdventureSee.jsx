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


function AdventureSee() {
    const list = useSelector((store) => store.adventureReducer.adventureDetailReducer);
    const seeList = useSelector((store) => store.adventureSeeDo.seeAdventureReducer);
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        dispatch({ type: 'FETCH_SEE_ADVENTURE', payload: id });
    }, []);

    console.log('Checking See Prompts List in AdventureSee: ', seeList)


    return (
        <>
        {(seeList.length) > 0 &&
                    <List>
                        {seeList.map((item, i) => {
                            return (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar variant="square" src={"http://simpleicon.com/wp-content/uploads/eye_1-256x256.png"}/>
                                        </ListItemAvatar>
                                        <ListItemText>
                                            <Typography className={classes.content} key={i}>
                                                {item.prompts}
                                            </Typography>
                                        </ListItemText>
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

export default AdventureSee;
