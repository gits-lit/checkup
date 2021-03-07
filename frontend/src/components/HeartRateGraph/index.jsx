import React from 'react';
import { Chart } from 'react-charts';

import './style.scss';

const defs = (
  <defs>
    <linearGradient id="0" x1="0" x2="0" y1="1" y2="0">
      <stop offset="0%" stopColor="#17EAD9" />
      <stop offset="100%" stopColor="#6078EA" />
    </linearGradient>
  </defs>
)

const HeartRateGraph = (props) => {
  const data = React.useMemo(
    () => {
      const newData = [];
      console.log(props.data);
      for (let i = 0 ; i < props.data.length - 5; i += 5) {
        console.log('loop');
        console.log(i);
        let average = 0;
        for (let j = i; j < i + 5; j += 1) {
          average += parseInt(props.data[j])
        }
        console.log(Math.floor(average/5));
        newData.push([i, Math.floor(average/5)])
      }
			return [{
        label: 'Heartbeat',
        data: newData
      }]
		}, 
    [props.plot]
	);

	const getSeriesStyle = React.useCallback((series) => {
    return {
      color: "#EFDCF6",
    };
  }, []);


	const series = React.useMemo(
    () => ({
      type: 'area',
			showPoints: true,
    }),
    []
  )

	const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom', show: false },
      { type: 'linear', position: 'left', show: false }
    ],
    []
  )

  return (
    <div className="heart-rate-graph">
      <h2 className="heading">💕 Heart Rate</h2>
      <h3 className="subheading">Based off rolling average every 5 sec</h3>
      <div className="graph-container">
      <Chart data={data} axes={axes} series={series} getSeriesStyle={getSeriesStyle} tooltip renderSVG={() => defs} />
      </div>
    </div>
  )
}

export default HeartRateGraph;