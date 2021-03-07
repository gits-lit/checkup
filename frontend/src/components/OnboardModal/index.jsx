import React, { createRef, useState } from 'react';
import { Carousel, Button } from 'antd';
import { Link } from 'react-router-dom';

import modal1 from '../../assets/modal1.png';
import modal2 from '../../assets/modal2.png';
import modal3 from '../../assets/modal3.png';

import './style.scss';

const OnboardModal = () => {
  const [currentIndex, updateIndex] = useState(0);

  const carouselRef = createRef();
  const handleNext = () => carouselRef.current.next();
  const handlePrev = () => carouselRef.current.prev();

  const carouselChange = (from, to) => {
    updateIndex(to);
    console.log(currentIndex);
  };

  return (
    <div className="OnboardModal">
      <div className="modalcontainer">
        <h1>Step One: Onboarding</h1>
      </div>
      <br />
      <Carousel effect="fade" ref={carouselRef} beforeChange={carouselChange}>
        <div className="model-item" dragging={true}>
          <h1>1. About Privacy</h1>
          <img src={modal1} alt="graphic" className="graphics" />
          <p>
            We collect no data during your checkup, any video or audio is lost
            after you close this website.
          </p>
        </div>
        <div className="model-item">
          <h1>2. How it works</h1>
          <img src={modal2} alt="graphic" className="graphics2" />
          <p>
            We utilize bleeding-edge machine learning to generate a health
            report based off your video, speech, and emotion.
          </p>
        </div>
        <div className="model-item">
          <h1>3. Get instant help</h1>
          <img src={modal3} alt="graphic" className="graphics3" />
          <p>
            At the end, get a list of recommended local doctors based on your
            conditions. After you leave, we’ll purge all your data!
          </p>
        </div>
      </Carousel>
      <div className="button-row">
        {currentIndex !== 0 ? (
          <Button className="back" onClick={handlePrev}>
            Go Back
          </Button>
        ) : (
          <Link to="/">
            <Button className="back" onClick={handlePrev}>
              Return Home
            </Button>
          </Link>
        )}
        {currentIndex === 2 ? (
          <Link to="/main">
            <Button className="next">Finish</Button>
          </Link>
        ) : (
          <Button className="next" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardModal;
