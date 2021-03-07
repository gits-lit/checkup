import React from 'react';

import download from '../../assets/download.svg';
import caution from '../../assets/caution.svg';
import './style.scss';

const PrognosisChart = (props) => {

  return (
    <div className="prognosis-chart">
      <h2 className="title">&#x1F4CB; Prognosis</h2>
      <h3 className="description">Based off video footage</h3>
      <div className="prognosis">
        <h1>{props.progonsis[0][0]}</h1>
        <h1 className="percentage">{parseInt(props.progonsis[0][1])}%</h1>
      </div>
      <div className="prognosis">
        <h1>{props.progonsis[1][0]}</h1>
        <h1 className="percentage">{parseInt(props.progonsis[1][1])}%</h1>
      </div>
      <div className="prognosis">
        <h1>{props.progonsis[2][0]}</h1>
        <h1 className="percentage">{parseInt(props.progonsis[2][1])}%</h1>
      </div>
      <div className="prognosis">
        <h1>{props.progonsis[3][0]}</h1>
        <h1 className="percentage">{parseInt(props.progonsis[3][1])}%</h1>
      </div>
      <div className="prognosis">
        <h1>{props.progonsis[4][0]}</h1>
        <h1 className="percentage">{parseInt(props.progonsis[4][1])}%</h1>
      </div>
      <div className="prognosis">
        <h1>N/A</h1>
        <h1 className="percentage">0%</h1>
      </div>
      <div className="prognosis1">
        <h1>N/a</h1>
        <h1 className="percentage">0%</h1>
      </div>
    </div>
  )
}

export default PrognosisChart;