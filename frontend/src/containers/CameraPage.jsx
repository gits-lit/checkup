import {useState, useEffect} from 'react';

import Video from '../components/Video';
import Questions from '../components/Questions';
import SpeechDetector from '../components/SpeechDetector';
import Toolbar from '../components/Toolbar';

import OpusMediaRecorder from 'opus-media-recorder';
window.MediaRecorder = OpusMediaRecorder;

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
      //await currentRecorder.stop(questionIndex);
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
    /*const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, { audioBitsPerSecond: 128000, mimeType: "audio/ogg" });
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });

      const start = () => {
          mediaRecorder.start();
          console.log('recording started!');
      }

    const stop = (index) =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/ogg" });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const play = () => audio.play();
          resolve({ audioBlob, audioUrl, play });
          const payload = {
            requests: [
              {
                  config: {
                      encoding: "OGG",
                      sampleRateHertz: 8000,
                      languageCode: "en-US",
                  },
                  audio: {
                      uri: audioUrl
                  }
              }
            ]
          };
          const response = fetch(`https://speech.googleapis.com/v1/speech:recognize?key=${process.env.REACT_APP_API_KEY}`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
          }).then(response => response.json())
            .then(data => {
                console.log("Successful API call!");
                console.log(data);
            })
            .catch(error => {
                throw new Error(error);
            });


          // TODO: Replace with google speech to text response
          setRecordings((recordings) => {
            const newRecordings = {...recordings};
            newRecordings[index] = audioUrl;
          });
        });

        mediaRecorder.stop();
        console.log({...recordings});
      });

    resolve({ start, stop });*/
    console.log('recording is gone');
  });


  const startRecording = async () => {
    //currentRecorder = await recordAudio();
    //currentRecorder.start();
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
