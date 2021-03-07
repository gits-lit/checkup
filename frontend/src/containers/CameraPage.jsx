import {useState, useEffect} from 'react';

import Video from '../components/Video';
import Questions from '../components/Questions';
import SpeechDetector from '../components/SpeechDetector';
import Toolbar from '../components/Toolbar';

const CameraPage = (props) => {
  const [questionIndex, setQuestionIndex] = useState(1);
  const [timer, setTimer] = useState(0);
  const [started, setStarted] = useState(false);
  const moveNext = () => {
    if (questionIndex < 10) {
      setQuestionIndex(questionIndex + 1);
    }
    else {
      props.setNext();
    }
  }
  const moveBack = () => {
    if (questionIndex > 1) {
      setQuestionIndex(questionIndex - 1);
    }
  }
  useEffect(() => {
    if (started) {
      setTimeout(() => {
        setTimer(timer + 1);
      }, 1000);
    }
  }, [timer]);

  return (
    /*<div>
      <Video />
      <SpeechDetector />
      <Questions />
    </div>*/
    <div>
      <Video />
      <SpeechDetector startTimer={() => {setStarted(true); setTimer(1);}}/>
      <Questions questionIndex={questionIndex} totalQuestions={10} moveNext={moveNext} moveBack={moveBack}/>
      <Toolbar timer={timer} moveNext={moveNext} moveBack={moveBack}/>
    </div>
  )
}

export default CameraPage;
