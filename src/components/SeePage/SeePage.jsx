import React, { useEffect } from 'react';
import { CardContent, Card, IconButton, Typography, CardMedia, makeStyles, } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function SeePage() {
    // const list = useSelector((store) => store.artworkDetailReducer);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     console.log('In useEffect param:');
    //     dispatch({type: 'FETCH_ART_DETAIL', payload: id})
    // }, []);

    // const {id} = useParams();



    return (

        <section>
            {/* <Card>
                <CardMedia
                component="video" 
                image={list.artwork_vidlink}
                >
                </CardMedia>
            </Card> */}
            <img src="https://lh6.ggpht.com/HlgucZ0ylJAfZgusynnUwxNIgIp5htNhShF559x3dRXiuy_UdP3UQVLYW6c=s1200">
            </img>
            <h3>
                text goes here
            </h3>
        </section>
    );
}


// artwork_vidlink
export default SeePage;