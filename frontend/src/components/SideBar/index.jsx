import React from 'react';
import { NavLink } from 'react-router-dom';

import bullet from '../../assets/bullet.svg';
import camera from '../../assets/camera.svg';
import gear from '../../assets/gear.svg';
import heartbeat from '../../assets/heartbeat.svg';
import location from '../../assets/location.svg';
import steps from '../../assets/steps.svg';

import './style.scss';

const SideBar = (props) => {
  return (
    <div className="side-bar">
      <NavLink to="/">
        <img src={heartbeat} alt="logo" className="heartbeat" />
      </NavLink>
      <div className="tabs">
        <div className={props.click === 'steps' ? 'tab selected':'tab'} onClick={() => {
          props.setClick('steps');
        }}>
          <div className="background"></div>
          <img src={steps} alt="logo" className="steps" />
        </div>
        <div className={props.click === 'camera' ? 'tab selected':'tab'} onClick={() => {
          props.setClick('camera');
        }}>
          <div className="background"></div>
          <img src={camera} alt="logo" className="camera" />
        </div>
        <div className={props.click === 'bullet' ? 'tab selected':'tab'} onClick={() => {
          props.setClick('bullet');
        }}>
          <div className="background"></div>
          <img src={bullet} alt="logo" className="bullet" />
        </div>
        <div className={props.click === 'location' ? 'tab selected':'tab'} onClick={() => {
          props.setClick('location');
        }}>
          <div className="background"></div>
          <img src={location} alt="logo" className="location" />
        </div>
      </div>
      <div className="gear">
        <img src={gear} alt="logo" />
      </div>
    </div>
  )
}

export default SideBar;