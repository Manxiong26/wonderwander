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
        console.log('In useEffect param:', list);
        dispatch({type: 'FETCH_SAY_DETAIL'})
    }, []);
    console.log('In useEffect param:', list);
    // const {id} = useParams();
    console.log(list);

    return (
        <div>
            <Container>
                <Grid>
                    <CardActionArea>
                        {list.map((lists, i) => {
                            return(
                        <Card>
                            <CardMedia>
                                IMAGE GOES HERE
                            <CardContent>
                                <Typography key={i}>
                                {lists.prompts}
                                </Typography>
                            </CardContent>    
                            </CardMedia>
                        </Card>
                        )})}
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