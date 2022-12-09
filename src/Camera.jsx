import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import "./App.css";
//firebase PlugIn
import { firebase } from "./firebase/firebase";
import { getDatabase, ref, update, get } from "firebase/database";
import { conv2dTranspose } from "@tensorflow/tfjs-layers/dist/exports_layers";
function Camera() {
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);
  const db = getDatabase();

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  return (
    <div className="Container">
      {img === null ? (
        <>
          <Webcam
            audio={false}
            mirrored={true}
            height={400}
            width={400}
            ref={webcamRef}
            screenshotFormat="image/png"
            videoConstraints={videoConstraints}
          />
          <button
            onClick={() => {
              capture();
              get(ref(db, "image/imgBase"), (snapshot) => {
                console.log(snapshot.val);
              });
            }}
          >
            Capture photo
          </button>
        </>
      ) : (
        <>
          <img src={img} alt="screenshot" />
          <button
            onClick={() => {
              setImg(null);
            }}
          >
            Retake
          </button>
          <img src={`${img}`} />
        </>
      )}
    </div>
  );
}

export default Camera;
