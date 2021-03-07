import { useEffect, useState } from 'react';

import './style.scss';
import next from '../../assets/next.png';
import toolbarback from '../../assets/toolbarback.svg';
import toolbarforward from '../../assets/toolbarforward.svg';
import toolbarmic from '../../assets/toolbarmic.svg';
import toolbarcamera from '../../assets/toolbarcamera.svg';

function str_pad_left(string,pad,length) {
  return (new Array(length+1).join(pad)+string).slice(-length);
}

const Toolbar = (props) => {
  const [time, setTimer] = useState('0:00');
  useEffect(() => {
    const minutes = Math.floor(props.timer / 60);
    const seconds = props.timer - minutes * 60;
    setTimer(str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2));
  }, [props.timer]);

  return (
    <div className="toolbar">
      <div className="bottom-bar">
        <div onClick={props.moveBack}><img src={toolbarback} /></div>
        <div onClick={props.moveNext}><img src={toolbarforward} /></div>
        <img className="next" onClick={props.moveNext} src={next} />
        <div><img src={toolbarmic} /></div>
        <div><img src={toolbarcamera} /></div>
      </div>
      <div className="timer">
        <div className={props.timer != 0 ? "dot blink" : "dot"}></div>
        <div>{time}</div>
      </div>
    </div>
  )
}

export default Toolbar;