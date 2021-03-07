import {useState, useEffect} from 'react';

import Video from '../components/Video';
import Questions from '../components/Questions';
import SpeechDetector from '../components/SpeechDetector';
import Toolbar from '../components/Toolbar';

let currentRecorder = null;
const CameraPage = (props) => {
  const [questionIndex, setQuestionIndex] = useState(1);
  const [timer, setTimer] = useState(0);
  const [started, setStarted] = useState(false);
  const [recordings, setRecordings] = useState({});
  const moveNext = async () => {
    if (questionIndex < 10) {
      if (currentRecorder ) {
        const audio = await currentRecorder.stop(questionIndex);
        audio.play();
        currentRecorder.start();
      }
      setQuestionIndex(questionIndex + 1);
    }
    else {
      props.setNext();
      await currentRecorder.stop(questionIndex);
    }
  }
  const moveBack = async () => {
    if (questionIndex > 1) {
      if (currentRecorder ) {
        const audio = await currentRecorder.stop(questionIndex);
        audio.play();
        currentRecorder.start();
      }
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

  const recordAudio = () =>
  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

    const start = () => mediaRecorder.start();

    const stop = (index) =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const play = () => audio.play();
          resolve({ audioBlob, audioUrl, play });
/*
          const payload = {
            requests: [
              {
                image: {
                  "content": base64.replace("data:image/webp;base64,", "")
                },
                features: [
                  {
                    "maxResults": 5,
                    "type": "OBJECT_LOCALIZATION"
                  },
                ]
              }
            ]
          }
        
          const response = await fetch(`https://speech.googleapis.com/v1/speech:recognize?key=${process.env.REACT_APP_API_KEY}`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Content-Length": base64.replace("data:image/webp;base64,", "").length
            },
            body: JSON.stringify(payload),
          });
        
          const data = await response.json();
          if (!data) throw new Error('Empty response from server');
          if (data.error) throw new Error(data.error.message);*/


          // TODO: Replace with google speech to text response
          setRecordings((recordings) => {
            const newRecordings = {...recordings};
            newRecordings[index] = audioUrl;
          });
        });

        mediaRecorder.stop();
        console.log({...recordings});
      });

    resolve({ start, stop });
  });


  const startRecording = async () => {
    currentRecorder = await recordAudio();
    currentRecorder.start();
  }

  return (
    <div>
      <Video started={started} data={props.data} setData={props.setData} setEmotions={props.setEmotions}/>
      <SpeechDetector startTimer={() => {setStarted(true); setTimer(1);}} startRecording={startRecording}/>
      <Questions questionIndex={questionIndex} totalQuestions={10} moveNext={moveNext} moveBack={moveBack}/>
      <Toolbar timer={timer} moveNext={moveNext} moveBack={moveBack}/>
    </div>
  )
}

export default CameraPage;
