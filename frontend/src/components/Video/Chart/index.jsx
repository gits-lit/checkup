import React, {useCallback, useEffect, useRef, useState} from 'react';

const Chart = (props) => {
	useEffect(() => {
	}, [props.plot])

    return (
        <div>
          {props.plot}
        </div>
    );
}

export default Chart;
