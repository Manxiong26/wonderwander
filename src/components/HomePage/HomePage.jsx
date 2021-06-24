import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import './HomePage.css'
import { useHistory, Link } from 'react-router-dom';

//matierl UI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

function HomePage() {
  //this pushes to the next page
  const history = useHistory();
  //this dispatch the saga
  const dispatch = useDispatch();
  
//initialize to the DOM
useEffect(() => {
  dispatch({type: 'FETCH_RANDOM_ART'});
  dispatch({type: 'FETCH_THREE_COLLECTION'});
}, []);

  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
//randomArt Store reducer
  const randomArt = useSelector((store) => store.randomArt);
//collection Store reducer
  const collectionThreeList = useSelector((store) => store.collectionThree);

  const viewCollectionDetail = (event, collDet ) => {
    history.push(`/collectionDetail/${collDet.id}`)
  }
  return (
    <>
      <div className="art">
        <h1>Welcome!!</h1>
        <h2>Art of the Day!</h2>
        <p key={randomArt.id}><img src={randomArt.image} /></p>
        <p>Artist:{randomArt.artist_name}</p>
        <p>Title:{randomArt.name}</p>
      </div>
      <div className="art">
        <h4 >Find Local Art:<Link to='/collection' className="browse">Browse All</Link></h4>
      </div>
      <div className="collectionList">
            {collectionThreeList.map(collection =>{
                
       return( <Box component="span" m={1} key={collection.id}>
        <Divider/>
        <p className="logo"><img className="logo2" src={collection.image}/> {collection.name} {collection.city}, {collection.state} xx.miles <Link onClick={(event) => viewCollectionDetail(event, collection)} className="arrow"> <ArrowForwardIosIcon/> </Link></p>
      </Box >) })}
      <Divider/>
      </div>
      {/* <Divider/>
      <Box component="span" m={1} >
        <p className="logo">Logo City, State xx.miles <Link to='/collection-detail' className="arrow"> <ArrowForwardIosIcon/> </Link></p>
      </Box >
      <Divider/>
      <Box component="span" m={1} >
        <p className="logo">Logo City, State xx.miles <Link to='/collection-detail' className="arrow"> <ArrowForwardIosIcon/> </Link></p>
      </Box >
      <Divider/>
      <Box component="span" m={1} >
        <p className="logo">Logo City, State xx.miles <Link to='/collection-detail' className="arrow"> <ArrowForwardIosIcon/> </Link></p>
      </Box >
      <Divider/> */}
      <div className="weekly"><Link to="/email" className="wonder"> <MailOutlineIcon className="email"/> Get Weekly Wonder News</Link></div>
      <Divider/>
      <div className="art">
        <h4>Other Art Adventures</h4>
        <div>At the Museum <Link to='/adventure' className="arrow"> <ArrowForwardIosIcon/> </Link></div>
      </div>
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <LogOutButton className="btn" />
      </div>
    </>
  );
}

// this allows us to use <App /> in index.js
export default HomePage;
