import React, {useCallback, useEffect, useRef, useState} from 'react';
import './style.scss';
import emoji from '../../../assets/emoji.svg';

const Emotions = (props) => {
	useEffect(() => {
		console.log('hello');
		console.log(props.emotion);
	}, [props.emotion])

    return (
      <div className="emotion-detector">
        <img src={emoji} />
        <div>{props.emotion}</div>
      </div>
    );
}

export default Emotions;
