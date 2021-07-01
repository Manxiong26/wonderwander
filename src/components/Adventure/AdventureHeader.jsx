import {
    Grid,
    Typography,
    Divider,
} from "@material-ui/core";
import { useStyles } from "../classes";
import React from "react";


function AdventureHeader({ list }) {
    const classes = useStyles();


    return (
        <>
            <Grid container direction="column">
                <Grid item xs={12} sm={12} lg={12}>
                    <div className={classes.pageMargin}>
                        <Typography variant="h5" className={classes.title}>
                            Adventure
                        </Typography>
                        <Typography className={classes.center}>
                            {list.title}
                        </Typography>
                            <img
                                className={classes.image}
                                src={list.image}
                            />
                        
                    </div>
                </Grid>
            </Grid>

        </>
    );
}

export default AdventureHeader;