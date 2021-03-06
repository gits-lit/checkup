import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from 'antd';
import logo from '../../assets/logo.svg';
import demo from '../../assets/demo.png';

import './style.scss';

const HomePage = () => {
  return (
    <div className="home-page">
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
          <Button className="demo" size="large">
            <img src={demo} alt="demo" className="demo-button" />
          </Button>
        </div>
      </div>
      <div className="content">
        <h1>Re-imagine Telemedicine</h1>
        <p>Dozens of <span className="bold">breakout sessions</span> will be led by deeply credentialed experts followed by engaged Q&#38;A. This version of the event will cover startup disciplines including fundraising, tech stack.</p>
        <div className="buttons">
          <NavLink to="/onboarding">
            <Button className="begin" size="large">Begin Now</Button>
          </NavLink>
          <NavLink to="/onboarding">
            <Button  className="view" size="large">View Info</Button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default HomePage;