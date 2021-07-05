import React from 'react';
import {Button, Typography, Divider} from '@material-ui/core';
import {useStyles} from '../classes'

function AboutPage() {
  const email = `shannon@wonderwander.art`
  const classes = useStyles();
  const goEmail = () => {
    window.location.href = `mailto:${email}`;
  }

  return (
    <div className="container">
      <div>
        <div className={classes.imageContainer}>
        <img className={classes.image} src="https://uploads-ssl.webflow.com/5ee5775bed4e85640a7db47f/600e48af247f2becaa582044_New%20Image%20WW-p-500.jpeg" alt="Shannon Steven, founder of Wonder Wander"/>
        </div>
        <div style={{marginTop: '15%'}}></div>
        <Divider/>
        <div className={classes.textBox}>
        <Typography variant="body1">Shannon Steven is an art teacher with a master's degree in K12 Art Education. She has worked in a classroom predominantly with elementary aged students but has also worked with adults throughout her career.
          She has an insatiable curiosity and loves to learn and try new art techniques. She also enjoys engaging her students in discussions about art and how they see the world.
          She believes that artmaking is a natural human drive that everyone should have access to. Through technique building, mindfulness and art activities, engaging play and adventure she helps her students experience the joy and benefits that visual art can provide.
          She is an approachable and enthusiastic teacher who values wonder and curiosity and enjoys the way the visual arts makes values accessible to everyone.</Typography>
        
        </div>
      </div>
      <div>
        <Button color="primary" type="button" onClick={(event) => {
          event.preventDefault();
          window.location.href='https://www.wonderwander.art/?=fb&fbclid=IwAR3hrbHFrxazo1thiM26G_fBIxeR00jlPm6-uDje8Qoq_DDKP2vv0BniuQE'
        }}>Visit Wonder Wander Studio</Button>
        <Button onClick={goEmail} color="secondary">Get Your Collection Added</Button>
        <Button onClick={goEmail} color="primary">Become A Sponsor</Button>
      </div>

    </div>
  );
}
export default AboutPage;