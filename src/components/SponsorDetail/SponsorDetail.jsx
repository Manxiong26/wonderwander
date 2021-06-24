import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {useParams} from 'react-router-dom';


function SponsorDetail(){
    const details = useSelector(store => store.sponsorDetails);
    const sponsorArt = useSelector(store => store.sponsorArt);
    const dispatch = useDispatch();

    const {id} = useParams();

    useEffect (() => {
        dispatch({type: 'FETCH_SPONSOR_DETAILS', payload: id})
    }, [])
    useEffect (() => {
        dispatch({type: 'FETCH_SPONSOR_ART', payload: id})
    }, [])

    return (
        <div>
            <img src={details.logo}></img>
            <button onClick={(event) => {
                event.preventDefault();
                window.location.href=`${details.site_link}`
            }}>Visit Website</button>
            <h3>MAP HERE</h3>
            <Grid container spacing={2}>
                {sponsorArt.map((art, index) => {
                    return (
                    <Grid item>
                        <Card className="artCard">
                            <CardMedia>
                                <img src={art.image}></img>
                            </CardMedia>
                            <CardContent>
                                <p>{art.description}</p>
                            </CardContent>
                        </Card>
                    </Grid>
                    )
                })}   
            </Grid>
        </div>

    )
}

export default SponsorDetail;