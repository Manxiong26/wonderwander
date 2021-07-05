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

function AdventureDo({truncateString}) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const doDetail = useSelector((store) => store.adventureSeeDo.doAdventureReducer);
    const { id } = useParams();

    useEffect(() => {
        dispatch({ type: 'FETCH_DO_ADVENTURE', payload: id })
    }, []);

    console.log('in do prompt looking for art detail information', doDetail);


    return (
        <>
        {(doDetail.length) > 0 &&
        <List>
        {doDetail.map((dolist, i) => {
            return (
                <>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar variant="square" src={"http://simpleicon.com/wp-content/uploads/camera.png"}/>
                        </ListItemAvatar>
                        <ListItemText>
                            <Typography className={classes.content} key={i}>
                                {truncateString(dolist.prompts, 50)}
                            </Typography>
                        </ListItemText>
                        <ArrowForwardIosIcon
            className={classes.nextBtn}
            onClick={(event) => history.push(`/adventure/do/${id}`)} />
                    </ListItem>  
                    </>
            )
            
        })}
        <Divider/>
        </List>  
        }         
        </>
    );
}

export default AdventureDo;