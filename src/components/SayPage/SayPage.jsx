import React, { useEffect } from "react";
import { CardContent, Card, IconButton, Typography, CardMedia, makeStyles, Container, Grid, Button, } from "@material-ui/core";
import CardActionArea from '@material-ui/core/CardActionArea';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


function SayPage() {
    // const classes = useStyles();
    // const history = useHistory();
    const list = useSelector((store) => store.seesaydoReducer.sayReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('In useEffect param:');
        dispatch({type: 'FETCH_SAY_DETAIL', payload: id})
    }, []);

    const {id} = useParams();

    return (
        <div>
            <Container>
                <Grid>
                    <CardActionArea>
                        <Card>
                            <CardMedia>
                                IMAGE GOES HERE
                            <CardContent>
                                <Typography>
                                {list.prompts}
                                </Typography>
                            </CardContent>    
                            </CardMedia>
                        </Card>
                    </CardActionArea>
                </Grid>
            </Container>
            <Button  variant="contained" color="primary">
                Vote!
            </Button>
        </div>
    );
}

export default SayPage;