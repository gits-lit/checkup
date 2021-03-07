import {useState} from 'react';

import Video from '../components/Video';
import SpeechDetector from '../components/SpeechDetector';

const CameraPage = () => {
  return (
    /* Temporarily removed due to lag
    <div>
      <Video />
      <SpeechDetector />
    </div>*/
    <div>
      <SpeechDetector />
    </div>
  )
}

export default CameraPage;