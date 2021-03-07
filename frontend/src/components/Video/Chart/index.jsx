import React, {useCallback, useEffect, useRef, useState} from 'react';

import CanvasJSReact from '../../../assets/canvasjs.react.js';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = (props) => {
    // might want to inherit heart rate data from props?? 
    const options = {
			  animationEnabled: true,
			  title:{
				    text: "Heart Rate"
			  },
			  axisX: {
            minimum: 0,
            maximum: 10,
				    labelFormatter: () => {return " "; }
			  },
			  axisY: {
				    title: "BPM"
			  },
			  data: [{
				    type: "spline",
				    dataPoints: props.plot
			  }]
		};
    return (
        <div>
          <CanvasJSChart options={options} />
        </div>
    );
}

export default Chart;
