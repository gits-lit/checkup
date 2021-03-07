import React from 'react';
import { Progress } from 'antd';

import './style.scss';

const ProgressGraph = (props) => {

  return (
    <div className="progress-graph">
      <div className="cc"></div>
      <h2 className="score-type">{props.name}</h2>
      <Progress
      type="circle"
      percent={props.percent}
      strokeColor={props.color}
      strokeWidth={15}
    />
    <h2 className="title">{props.title}</h2>
    <h3 className="description">{props.description}</h3>

    </div>
  )
}

export default ProgressGraph;