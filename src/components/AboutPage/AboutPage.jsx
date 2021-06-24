import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h2>Picture here later</h2>
        <h2>About description here later</h2>
      </div>
      <div>
        <button type="button" onClick={(event) => {
          event.preventDefault();
          window.location.href='https://www.wonderwander.art/?=fb&fbclid=IwAR3hrbHFrxazo1thiM26G_fBIxeR00jlPm6-uDje8Qoq_DDKP2vv0BniuQE'
        }}>Visit Wonder Wander Studio</button>
        <button>Get Your Collection Added</button>
        <button>Become A Sponsor</button>
      </div>

    </div>
  );
}

export default AboutPage;
