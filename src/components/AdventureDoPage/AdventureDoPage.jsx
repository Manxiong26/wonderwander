import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
    Typography,
    Button,
} from "@material-ui/core";
import { useStyles } from "../classes";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

function AdventureDoPage() {
    // const classes = useStyles();
    const list = useSelector((store) => store.adventureSeeDo.doAdventureReducer);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        console.log('In useEffect param:');
        dispatch({ type: 'FETCH_DO_ADVENTURE', payload: id })
    }, []);
    const history = useHistory();
    const classes = useStyles();

    return (
        <div className={classes.pageMargin}>
            <Button
                onClick={() => {
                    history.goBack();
                }}
            >
                <ArrowBackIosIcon />
            </Button><CameraAltIcon
                className={classes.nextBtn} />
            <div className={classes.pageMargin}>
                {list.map((lists, i) => {
                    return (
                        <Typography
                            className={classes.redCenter} key={i}>To do this task! {lists.prompts}
                        </Typography>
                    )
                })}
            </div>
        </div>
    );
}

export default AdventureDoPage;