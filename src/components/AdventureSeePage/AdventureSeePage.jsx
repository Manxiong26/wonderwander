import React, { useEffect } from 'react';
import { CardContent, Card, IconButton, Typography, CardMedia, makeStyles, } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from "prop-types";
import ReactPlayer from 'react-player';



function AdventureSeePage() {
    const list = useSelector((store) => store.adventureSeeDo.seeAdventureReducer);
    const dispatch = useDispatch();
    const {id} = useParams();
    
    
    useEffect(() => {
        console.log('In useEffect param:');
        dispatch({type: 'FETCH_SEE_ADVENTURE', payload: id})
    }, []);

    
console.log('TESTING', list);


    return (
        <div>
            {list.map((lists, i) => {
                return (
                    <section>
                    
                      
                            <ReactPlayer url={lists.link} controls="true" width="100" />
                        
            
                    <Typography key={i} align="center" gutterBottom variant="h5">
                        {lists.prompts}
                    </Typography>
                </section>
                )
            })}
        
        </div>
    );
}


// artwork_vidlink
export default AdventureSeePage;