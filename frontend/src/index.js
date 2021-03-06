import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import './style.scss';

//pages
import HomePage from './containers/HomePage';
import MainPage from './containers/MainPage';
import OnboardingPage from './containers/OnboardingPage';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/main" component={MainPage} />
        <Route path="/onboarding" component={OnboardingPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);