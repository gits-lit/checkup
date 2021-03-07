import React from 'react'
import { NavLink } from 'react-router-dom';

import back from '../../assets/back.svg';
import restart from '../../assets/restart.svg';

import './style.scss';

const NavBar = (props) => {
  return (
    <div className="nav-bar">
      <img src={back} alt="back" className="back-button" onClick={props.setBack}/>
      <h1 className="step-number">{props.number}</h1>
      <div className="step-note">
        <h1>{props.currentStep}</h1>
        <h2>{props.nextStep}</h2>
      </div>
      <div className="settings">
        <NavLink to="/">
          <h1>Home</h1>
        </NavLink>
        <NavLink to="/onboarding">
          <h1>Privacy</h1>
        </NavLink>
        <NavLink to="/onboarding">
        <img src={restart} alt="restart" className="restart-button" />
        </NavLink>
        <h1 className="restart">Restart</h1>
      </div>
    </div>
  )
}

export default NavBar;