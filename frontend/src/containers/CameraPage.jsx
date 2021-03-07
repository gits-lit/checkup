import {useState, useEffect} from 'react';

import Video from '../components/Video';
import Questions from '../components/Questions';
import SpeechDetector from '../components/SpeechDetector';

const CameraPage = () => {
  const [questionIndex, setQuestionIndex] = useState(1);
  useEffect(() => {
    setInterval(() => {
      setQuestionIndex(questionIndex + 3);
      console.log('updating');
    }, 2000);
  }, [])

  return (
    <div>
      <Video />
      <SpeechDetector />
      <Questions />
    </div>*/
    <div>
      <SpeechDetector />
      <Questions questionIndex={questionIndex} totalQuestions={20}/>
    </div>
    */
  )
}

export default CameraPage;
