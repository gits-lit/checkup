import {useState} from 'react';

import Video from '../components/Video';
import SpeechDetector from '../components/SpeechDetector';

const CameraPage = () => {
  return (
    <div>
      <Video />
      <SpeechDetector />
    </div>
  )
}

export default CameraPage;