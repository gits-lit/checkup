import React, {useCallback, useEffect, useRef, useState} from 'react';
import Webcam from "react-webcam";

import * as faceapi from 'face-api.js';

import './style.scss';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const Video = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const tempCanvasRef = useRef(null);
  const imageRef = useRef(null);

  const capture = useCallback(
    async () => {
    },
    [canvasRef, webcamRef]
  );

  useEffect(() => {

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ]).then(() => {
      setInterval(async () => {
        //capture();
        const canvas = canvasRef.current;
        const tempCanvas = tempCanvasRef.current;
        const image = imageRef.current;
        //const displaySize = { width: 1280, height: 720 }
        const video = document.getElementsByTagName('video')[0];
  
        if (video && canvas && tempCanvas && image && webcamRef.current) {
          const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())//.withFaceExpressions();
          //const resizedDetections = faceapi.resizeResults(detections, displaySize);
          //console.log('drawing');
          //console.log(resizedDetections);
          if (detections) {
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, detections);

            // Set the src of image element 
            const imageSrc = webcamRef.current.getScreenshot();
            image.src = imageSrc;
            image.onload = () => {
              // Throw the image element on the canvas
              const ctx = tempCanvas.getContext('2d');
              ctx.drawImage(image, 0, 0, 1280, 720);
              console.log(tempCanvas);

              // Pull the image data from the canvas
              const imageData = ctx.getImageData(0, 0, 1280, 720);
              ctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
              console.log('HERE IS THE DATA KYLE');
              //console.log(imageData);
              console.log(imageData.data);
              // Every 4 values is r, g, b, a repeated
              // Dimensions is width 1280 height 720
            }
          }
          //faceapi.draw.drawFaceExpressions(canvas, detections);
        }
      }, 5000);
   })
  }, []);


  return (
    <div className="video-component">
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <canvas ref={canvasRef} id="primary-canvas" height={720} width={1280}/>
      <canvas ref={tempCanvasRef} height={720} width={1280}/>
      <img ref={imageRef} />
    </div>
  );
}

export default Video;