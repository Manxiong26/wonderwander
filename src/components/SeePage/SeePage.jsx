import React, { useEffect } from 'react';
import { CardContent, Card, IconButton, Typography, CardMedia, makeStyles, } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId }) => (
    <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
  
  YoutubeEmbed.propTypes = {
    embedId: PropTypes.string.isRequired
  };


function SeePage() {
    const list = useSelector((store) => store.seesaydoReducer.seeReducer);
    const dispatch = useDispatch();
    // const {id} = useParams();
    
    
    useEffect(() => {
        console.log('In useEffect param:');
        dispatch({type: 'FETCH_SEE_DETAIL'
        // , payload: id
    })
    }, []);

    
console.log('TESTING', list);


    return (
        <div>
        {list[0] === undefined ? 
        ''
        :
        (
        <section>
            <Card>
                <CardMedia>
                <YoutubeEmbed embedId="GyT1wPQSER8"/>
                </CardMedia>
            </Card>
            <h3>
            {list[0].prompts}
            </h3>
        </section>
        )}
        </div>
    );
}


// artwork_vidlink
export default SeePage;