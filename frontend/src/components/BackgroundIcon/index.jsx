import React from 'react';
import bluePill from '../../assets/blue-pill.png';
import hands from '../../assets/hands.png';
import orangePill from '../../assets/orange-pill.png';

import './style.scss';

const BackgroundIcon = () => {
  return (
    <div className="background">
      <img src={bluePill} alt="blue-pill" className="blue-pill" />
      <div className="hand-icon">
        <img src={hands} alt="hands" className="hands" />
        <img src={orangePill} alt="blue-pill" className="orange-pill" />
      </div>
    </div>
  )
}

export default BackgroundIcon;