import {
    ListItem,
    ListItemText,
    CardContent,
    CardMedia,
    Typography,
} from "@material-ui/core";
import { Card } from "@material-ui/core";
import React, { useEffect } from "react";
import { useStyles } from "../classes";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


function AdventureSee() {
    const list = useSelector((store) => store.adventureReducer.adventureDetailReducer);
    const seelist = useSelector((store) => store.adventureSeeDo.seeAdventureReducer);
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();


    useEffect(() => {
        console.log('In useEffect param:');
        dispatch({ type: 'FETCH_ADVENTURE', payload: id });
        dispatch({ type: 'FETCH_SEE_ADVENTURE', payload: id });
    }, []);

    const { id } = useParams();

    return (
        <>

            <Card className={classes.card}>
                <CardContent>
                    <CardMedia
                        className={classes.smallImg}
                        component="img"
                        image={list.image}
                    />
                    <div>
                        <ArrowForwardIosIcon
                            className={classes.nextBtn}
                            onClick={(event) => history.push(`/adventure/see/${id}`)} />
                        {seelist.map((seel, i) => {
                            return (
                                <CardContent>
                                    <ListItem>
                                        <ListItemText>
                                            <Typography className={classes.content} key={i}>
                                                {seel.prompts}
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                </CardContent>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export default AdventureSee;
