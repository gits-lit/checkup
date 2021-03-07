import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from 'antd';
import logo from '../../assets/logo.svg';
import demo from '../../assets/demo.svg';
import blueglow from '../../assets/blueglow.png';
import righthome from '../../assets/righthome.png';

import './style.scss';

const HomePage = () => {
  return (
    <div className="home-page">
      <img src={righthome} alt="pill" className="righthome" />
      <img src={blueglow} alt="pill" className="blueglow" />
      <div className="home-nav">
        <img src={logo} alt="logo" className="logo" />
        <div className="links">
          <NavLink to="/">
            <h4>Features</h4>
          </NavLink>
          <NavLink to="/">
            <h4>Pricing</h4>
          </NavLink>
          <NavLink to="/">
            <h4>About</h4>
          </NavLink>
          <NavLink to="/">
            <h4>Team</h4>
          </NavLink>
        </div>
        <NavLink to="/onboarding">
          <img src={demo} alt="demo" className="demo-button" />
        </NavLink>
      </div>
      <div className="content">
        <h1>Re-imagine Telemedicine</h1>
        <p>
          Telemedicine allows health care professionals to evaluate, diagnose
          and treat patients at a distance using telecommunications technology.
          The approach has been through a striking evolution in the last decade.
        </p>
        <div className="buttons">
          <NavLink to="/onboarding">
            <Button className="begin" size="large">
              Begin Now
            </Button>
          </NavLink>
          <NavLink to="/onboarding">
            <Button className="view" size="large">
              View Info
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
