import {
    Typography,
    Divider,
    Button,
    ListItemText,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import AdventureHeader from "./AdventureHeader";
import AdventureSee from "./AdventureSee";
import AdventureDo from "./AdventureDo";
import { useHistory } from "react-router-dom";
import { useStyles } from "../classes";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function Adventure() {
    const advDetail = useSelector((store) => store.adventureReducer.adventureDetailReducer);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const classes = useStyles();

    // Function to create preview of prompt
    const truncateString = (str, num) => {
        if (str.length <= num) {
          return str
        }
        return str.slice(0, num) + '...'
      }



    useEffect(() => {
        dispatch({ type: 'FETCH_ADVENTURE_DETAIL', payload: id })
    }, []);

    console.log('Adventure Detail: ', advDetail);
    console.log('Adventure Detail ID: ', id);



    return (
        <>
            <div className={classes.pageMargin}>
                <Button
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    <ArrowBackIosIcon />
                </Button>
                <AdventureHeader advDetail={advDetail} />
                <Typography variant="h6" className={classes.redCenter}>
                    Adventure Description
                    <Divider />
                </Typography>
                <div className={classes.textBox}>
                <ListItemText
                    className={classes.center}
                    primary={advDetail.description}
                />
                </div>
                <Divider />
                <Typography variant="h6" className={classes.redCenter}>
                    See. Do.
                    <Divider />
                </Typography>
                <AdventureSee truncateString={truncateString} />
                <AdventureDo truncateString={truncateString} />
            </div>
        </>
    );
}

export default Adventure;