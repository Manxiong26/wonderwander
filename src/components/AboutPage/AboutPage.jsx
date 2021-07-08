import React from 'react';
import {Button, Typography, Divider} from '@material-ui/core';
import {useStyles} from '../classes'

function AboutPage() {

  //declare email variable with the value being an email address, this is for the goEmail function 
  const email = `shannon@wonderwander.art`

  //classes variable to bring in classes.js file for styling 
  const classes = useStyles();
  
  //function to handle opening the user's email to send an email to contact wonder wander
  //takes a string of text and event as an argument 
  const goEmail = (event, text) => {
    event.preventDefault();

    //when this function is run, the user's email is opened with the to: line filled with the string of email
    //the subject text is filled with the text argument
    window.location.href = `mailto:${email}?subject=${text}`;
  }

  return (
    <div className="container">
      <div>
        <div className={classes.center}>
          <Typography variant="h3" className={classes.title}>Shannon Steven</Typography>
          <img className={classes.image} src="https://uploads-ssl.webflow.com/5ee5775bed4e85640a7db47f/600e48af247f2becaa582044_New%20Image%20WW-p-500.jpeg" alt="Shannon Steven, founder of Wonder Wander"/>
        </div>
        <div style={{marginTop: '10%'}}></div>
        <Divider/>
        <div className={classes.textBox}>
          <Typography variant="body1">Shannon Steven is an art teacher with a master's degree in K12 Art Education. She has worked in a classroom predominantly with elementary aged students but has also worked with adults throughout her career.
            She has an insatiable curiosity and loves to learn and try new art techniques. She also enjoys engaging her students in discussions about art and how they see the world.
            She believes that artmaking is a natural human drive that everyone should have access to. Through technique building, mindfulness and art activities, engaging play and adventure she helps her students experience the joy and benefits that visual art can provide.
            She is an approachable and enthusiastic teacher who values wonder and curiosity and enjoys the way the visual arts makes values accessible to everyone.</Typography>
        </div>
      </div>
      <div className={classes.center}>

        {/* when the button is clicked, the user is directed to the wonder wander webpage */}
        <Button color="primary" type="button" onClick={(event) => {
          event.preventDefault();
          window.location.href='https://studio.wonderwander.art/'
          }}>Visit Wonder Wander Studio</Button>

          {/* when the button is clicked, the email is opened with the 'Submit A Collection' as the subject line*/}
        <Button onClick={(event) => goEmail(event, 'Submit A Collection')} color="secondary">Get Your Collection Added</Button>

        {/* when the button is clicked, the email is opened with the 'Become a Sponsor' as the subject line */}
        <Button onClick={(event) => goEmail(event, 'Become a Sponsor')} color="primary">Become A Sponsor</Button>
      </div>
    </div>
  );
}

// for exporting to App
export default AboutPage;