///////// NEW STUFF ADDED USE STATE
import React, { useRef, useState, useEffect } from "react";
///////// NEW STUFF ADDED USE STATE

// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection"
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utilities";

///////// NEW STUFF IMPORTS
//fingerpose import
import * as fp from "fingerpose";
import * as fpg from "fingerpose-gestures"
import { fingerGunGesture, fistGesture,victoryGesture } from "./customPose";

//fingerpose image
import victory from "./image/victory.png";
import splayed from "./image/splayed.png";
import rock from './image/rock.png';
import fingerGun from './image/fingerGun.png'
///////// NEW STUFF IMPORT

//firebase PlugIn
import { firebase } from './firebase/firebase'
import {
  getDatabase,
  ref,
  update,
} from "firebase/database"


const HandPose = ({ player }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);


  ///////// NEW STUFF ADDED STATE HOOK
  const [emoji, setEmoji] = useState(null);
  const images = { finger_splayed: splayed, victory: victory, fist: rock, finger_gun: fingerGun };
  ///////// NEW STUFF ADDED STATE HOOK

  const runHandpose = async () => {
    const model = handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
      runtime: 'mediapipe', // or 'tfjs',
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
      modelType: 'full'
    }
    const detector = await handPoseDetection.createDetector(model, detectorConfig);
    // const net = await handpose.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(detector);
    });
  };


  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight



      // Set video width
      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      // Set canvas height and width
      canvasRef.current.width = videoWidth
      canvasRef.current.height = videoHeight

      // Make Detections
      const hand = await net.estimateHands(video)
      if (hand.length > 0) {
        //使用keypoint3D
        const keypointsAry = Object.values(hand[0].keypoints3D)

        for (let handSide in keypointsAry) {
          keypointsAry[handSide] = Object.values(keypointsAry[handSide])
        }


        const GE = new fp.GestureEstimator([
          //引入 fingerposeGesture 套件，
          //剪刀
          victoryGesture,
          //布
          fpg.Gestures.fingerSplayedGesture,
          //石頭
          fistGesture,
          //fpg.Gestures.fistGesture,
          //手指槍
          fingerGunGesture
        ]);
        const gesture = await GE.estimate(keypointsAry, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          // console.log(gesture.gestures);

          const confidence = gesture.gestures.map(
            (prediction) => prediction.score
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          // console.log(gesture.gestures[maxConfidence].name);

          //uploading catch or not
          const db = getDatabase()

          if (gesture.gestures[maxConfidence] !== undefined) {
            if (gesture.gestures[maxConfidence].name === 'fist') {
              update(ref(db, `/playerMouse/${player}`), {
                click: true
              });
            } else if (gesture.gestures[maxConfidence].name === 'finger_gun') {
              update(ref(db, `/playerMouse/${player}`), {
                shooting: true
              });
            }
            else {
              update(ref(db, `/playerMouse/${player}`), {
                click: false,
                shooting: false,
                catch: 'none'
              });
            }
            setEmoji(gesture.gestures[maxConfidence].name);
          }
        }
      }
      ///////// NEW STUFF ADDED GESTURE HANDLING

      // if (hand.length > 0) {
      //   const GE = new fp.GestureEstimator([
      //     fp.Gestures.VictoryGesture,
      //     fp.Gestures.ThumbsUpGesture,
      //   ]);
      //   const gesture = await GE.estimate(fingerPose[0].landmarks, 4);
      //   if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
      //     // console.log(gesture.gestures);

      //     const confidence = gesture.gestures.map(
      //       (prediction) => prediction.confidence
      //     );
      //     const maxConfidence = confidence.indexOf(
      //       Math.max.apply(null, confidence)
      //     );
      //     // console.log(gesture.gestures[maxConfidence].name);
      //     setEmoji(gesture.gestures[maxConfidence].name);
      //     console.log(emoji);
      //   }
      // }

      /////// NEW STUFF ADDED GESTURE HANDLING

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx, player);
    }
  };

  useEffect(() => { runHandpose() }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: '100vw',
            height: '100vh',
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width:'80vw',
            height: '100vh',
          }}
        />
        {/* NEW STUFF */}
        {emoji !== null ? (
          <img
            src={images[emoji]}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 400,
              bottom: 500,
              right: 0,
              textAlign: "center",
              height: 100,
            }}
          />
        ) : (
          ""
        )}

        {/* NEW STUFF */}
      </header>
    </div>
  );
}

export default HandPose;
