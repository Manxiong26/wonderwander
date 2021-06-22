import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import './HomePage.css'
import { Link } from 'react-router-dom';

function HomePage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <>
      <div className="art">
        <h1>Art of the Day!</h1>

        <p>Artist:</p>
        <p>Title:</p>
      </div>
      <div className="art">
        <h4>Find Local Art:<Link to='/browse-collection' className="browse">Browse All</Link></h4>
      </div>
      <div className="art">
        <p className="logo">Logo City, State xx.miles <Link to='/collection-detail' className="arrow"> &#8594; </Link></p>
      </div >
      <div className="art">
        <p className="logo">Logo City, State xx.miles <Link to='/collection-detail' className="arrow"> &#8594; </Link></p>
      </div>
      <div className="art">
        <p className="logo">Logo City, State xx.miles <Link to='/collection-detail' className="arrow"> &#8594; </Link></p>
      </div>

      <div className="weekly"> Get Weekly Wonder News</div>

      <div className="art">
        <h4>Other Art Adventures</h4>
        <div>At the Museum <Link to='/collection-detail' className="arrow"> &#8594; </Link></div>
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
