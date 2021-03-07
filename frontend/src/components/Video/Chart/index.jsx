import React, {useCallback, useEffect, useRef, useState} from 'react';

const Chart = (props) => {
	useEffect(() => {
		console.log('hello')
		console.log(props.plot);
	}, [props.plot])

    return (
        <div>
          {props.plot}
        </div>
    );
}

export default Chart;
