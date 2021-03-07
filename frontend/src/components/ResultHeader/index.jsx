import React from 'react';

import download from '../../assets/download.svg';
import caution from '../../assets/caution.svg';
import './style.scss';

const ResultHeader = (props) => {

  return (
    <div className="result-header">
      <div className="caution-note">
        <img src={caution} alt="caution" className="caution" />
        <h1>
          This is <span className="bold">not</span> a medical advice. Checkup is a technical demonstration of bleeding-edge technology that has not been FDA approved. Use with caution!
        </h1>
        <h2 className="close-button">x</h2>
      </div>
      <div className="end-results">
        <h1>Your Results</h1>
        <div className="download-button">
          <img src={download} alt="download" className="download" />
          <h2>Download Report</h2>
        </div>
      </div>
    </div>
  )
}

export default ResultHeader;