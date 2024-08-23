import React from 'react';
import './Styles/MainContent.css';

function MainContent() {
  return (
    <section className="main-content">
      <div className="text-content">
        <h1>STILL <br /> ROASTING</h1>
        <p className="subtitle">TEST THE BEST</p>
        <p className="description">
          I wake up some mornings and sit and have my coffee and look out at my beautiful garden, 
          and I go, 'Remember how good this is. Because you can lose it'.
        </p>
        <a href="#" className="btn">BUY NOW</a>
        <p className="quote">"Keep it real and enjoy the coffee."</p>
      </div>
      <div className="image-content">
        <img src="coffee-bag.png" alt="Brazaville Coffee Bag" />
        <div className="floating-beans">
          <img src="bean1.png" alt="Coffee Bean" />
          <img src="bean2.png" alt="Coffee Bean" />
          <img src="bean3.png" alt="Coffee Bean" />
        </div>
      </div>
    </section>
  );
}

export default MainContent;
