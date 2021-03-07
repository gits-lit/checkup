import { Progress } from 'antd';
import './style.scss';

const BarGraph = (props) => {
  const maxTime = parseInt((props.emotions[0])[1]) + 7;
  return (
    <div className="bar-graph">
      <h2 className="title">&#x1F4CA; Emotions Detected</h2>
      <h3 className="description">Timed Duration</h3>
      <div className="bar-container">
        <h1>{Math.floor(parseInt((props.emotions[0])[1]) / 60)}M {parseInt((props.emotions[0])[1]) % 60}SEC</h1>
        <Progress percent={Math.max(70, (parseInt((props.emotions[0])[1])/maxTime).toFixed(4) * 100)} showInfo={false} strokeLinecap="square" strokeWidth='55'strokeColor="#2F80ED"
          trailColor="white"/>
      </div>
      <div className="bar-container">
        <h1>{Math.floor(parseInt((props.emotions[1])[1]) / 60)}M {parseInt((props.emotions[1])[1]) % 60}SEC</h1>
        <Progress percent={Math.max(60, (parseInt((props.emotions[1])[1])/maxTime).toFixed(4) * 100)} showInfo={false} strokeLinecap="square" strokeWidth='55'strokeColor="#F2994A"
          trailColor="white"/>
      </div>
      <div className="bar-container">
        <h1>{Math.floor(parseInt((props.emotions[2])[1]) / 60)}M {parseInt((props.emotions[2])[1]) % 60}SEC</h1>
        <Progress percent={Math.max(57, (parseInt((props.emotions[2])[1])/maxTime).toFixed(4) * 100)} showInfo={false} strokeLinecap="square" strokeWidth='55'strokeColor="#219653"
          trailColor="white"/>
      </div>
      <div className="bar-container">
        <h1>{Math.floor(parseInt((props.emotions[3])[1]) / 60)}M {parseInt((props.emotions[3])[1]) % 60}SEC</h1>
        <Progress percent={Math.max(47, (parseInt((props.emotions[3])[1])/maxTime).toFixed(4) * 100)} showInfo={false} strokeLinecap="square" strokeWidth='55'strokeColor="#F2C94C"
          trailColor="white"/>
      </div>
      <div className="bar-container">
        <h1>{Math.floor(parseInt((props.emotions[4])[1]) / 60)}M {parseInt((props.emotions[4])[1]) % 60}SEC</h1>
        <Progress percent={Math.max(31, (parseInt((props.emotions[4])[1])/maxTime).toFixed(4) * 100)} showInfo={false} strokeLinecap="square" strokeWidth='55'strokeColor="#EB5757"
          trailColor="white"/>
      </div>
      <div className="color-filter">
        <div className="color-container">
          <div className="cc1"></div>
          <h3>{(props.emotions[0])[0]}</h3>
        </div>
        <div className="color-container">
          <div className="cc2"></div>
          <h3>{(props.emotions[1])[0]}</h3>
        </div>
        <div className="color-container">
          <div className="cc3"></div>
          <h3>{(props.emotions[2])[0]}</h3>
        </div>
        <div className="color-container">
          <div className="cc4"></div>
          <h3>{(props.emotions[3])[0]}</h3>
        </div>
        <div className="color-container">
          <div className="cc5"></div>
          <h3>{(props.emotions[4])[0]}</h3>
        </div>
      </div>
    </div>
  )
}

export default BarGraph;