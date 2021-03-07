import React, {useCallback, useEffect, useRef, useState} from 'react';
import Chart from './Chart';
import Webcam from "react-webcam";

import * as faceapi from 'face-api.js';
import * as utils from './utils.js';

import './style.scss';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const thing = new utils.HeartRateFinder(256);

let interval = null;

const Video = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const tempCanvasRef = useRef(null);
  const imageRef = useRef(null);

  const [dataX, setDataX] = useState(0);
  const [rawData, setRawData] = useState([]);
  const [processedData, setProcessedData] = useState([]);
  const fps = 30;
  const num_data_points = 10;

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
      interval = setInterval(async () => {
        //capture();
        const canvas = canvasRef.current;
        const tempCanvas = tempCanvasRef.current;
        const image = imageRef.current;
        //const displaySize = { width: 1280, height: 720 }
        const video = document.getElementsByTagName('video')[0];
        if (video && canvas && tempCanvas && image && webcamRef.current) {
          const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions());//.withFaceExpressions();
          
          //console.log('drawing');
          //console.log(resizedDetections);
          if (detections && video && canvas && tempCanvas && image && webcamRef.current) {
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            const foreheadCoords = utils.getForeheadCoords(detections.box.x, detections.box.y, detections.box.width, detections.box.height);
            //const resizedDetections = faceapi.resizeResults(detections, displaySize);
            const resizedDetections = faceapi.resizeResults(detections, {width: canvas.width, height: canvas.height});
            const box = detections.box;
            const normalizedX = box.x / 1280;
            const normalizedY = box.y / 720;
            const normalizedWidth = box.width / 1280;
            const normalizedHeight = box.height / 720;
            const ctx = canvas.getContext('2d');
            const x = normalizedX * canvas.width;
            const width = normalizedY * canvas.width;
            const y = normalizedWidth * canvas.height;
            const height = normalizedHeight * canvas.height;
            //console.log(x);
            //console.log(y);
            //console.log(width);
            //console.log(height);
            ctx.beginPath();
            var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop("0", "#0761FF");
            gradient.addColorStop("0.5", "#FF59F8");
            gradient.addColorStop("1", "#AE72FF");
            //#0761FF -53.27%, #FF59F8 89.25%, #AE72FF 139.44%
            ctx.lineWidth = "6";
            ctx.strokeStyle = gradient;
            ctx.rect(box.x, box.y, box.width, box.height);
            ctx.stroke();

            // Set the src of image element 
            const imageSrc = webcamRef.current.getScreenshot();
            image.src = imageSrc;
            image.onload = () => {
              // Throw the image element on the canvas
              const ctx2 = tempCanvas.getContext('2d');
              ctx2.drawImage(image, 0, 0, canvas.width, canvas.height);
              //console.log(tempCanvas);

              // Pull the image data from the canvas
              const imageData = ctx2.getImageData(foreheadCoords.x, foreheadCoords.y, foreheadCoords.width, foreheadCoords.height);
              ctx2.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
              // TODO: Move heart rate;
              thing.updateHeartRate(imageData.data);

              const newData = [...rawData];
              console.log('hi there');
              if (thing.heartRate === undefined) newData.push(rawData[rawData.length-1]);
              else newData.push(thing.heartRate);
                console.log('fuck');
                console.log(rawData);
                //console.log(newData);
                
              if (rawData.length > fps) {
                let average = rawData.reduce((a,b) => a+b) / newData.length;
                const newProcessedData= [...processedData];
                newProcessedData.push({ x: dataX, y: average });
                setRawData([]);
                setDataX(dataX + 1);

                if (newProcessedData.length > num_data_points) {
                    newProcessedData.shift();
                }
                console.log('ay we made it');
                console.log(newProcessedData);
                setProcessedData(newProcessedData);
              }
                else {
                    console.log('aganugbafboia');
                    console.log(newData);
                    setRawData(newData);
                    console.log('settingafafaf');
                }
            }
          }
          //faceapi.draw.drawFaceExpressions(canvas, detections);
        }
        // Change this for time between screenshots (in milliseconds)
        return () => {
          clearInterval(interval);
        }
      }, 1000/fps);
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
      <Chart plot={processedData}/>
      <canvas ref={canvasRef} id="primary-canvas" height={720} width={1280}/>
      <canvas ref={tempCanvasRef} id="secondary-canvas" height={720} width={1280}/>
      <img ref={imageRef} />
    </div>
  );
}

export default Video;
