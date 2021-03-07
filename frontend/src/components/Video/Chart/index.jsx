import React, {useCallback, useEffect, useRef, useState} from 'react';
import { Chart } from 'react-charts';
import './style.scss';

const ChartContainer = (props) => {
	
  const data = React.useMemo(
    () => {
			const newData = [];
			props.plot.slice(Math.max(props.plot.length - 10, 0)).forEach((value, index) => {
				newData.push([index, parseInt(value)])
			});
			return [{
        label: 'Series 1',
        data: newData
      }]
		}, 
    [props.plot]
	);

	const getSeriesStyle = React.useCallback((series) => {
    return {
      color: "#FFFFFF",
    };
  }, []);


	const series = React.useMemo(
    () => ({
			showPoints: false,
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

	//					<Chart data={data} axes={axes} series={series} getSeriesStyle={getSeriesStyle} />

	return (
		
			<div className="heart-chart">
				<div className="chart-container">
          <Chart data={data} axes={axes} series={series} getSeriesStyle={getSeriesStyle} />
					<div className="bpm">❤️ &nbsp; {props.plot[props.plot.length - 1]}bpm</div>
				</div>
			</div>
	);
}

export default ChartContainer;
