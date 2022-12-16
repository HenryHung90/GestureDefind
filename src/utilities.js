import { firebase } from './firebase/firebase'
import {
  getDatabase,
  ref,
  update,
} from "firebase/database"
// Points for fingers
const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

// Infinity Gauntlet Style
const style = {
  0: { color: "red", size: 6 },
  1: { color: "yellow", size: 3 },
  2: { color: "yellow", size: 3 },
  3: { color: "yellow", size: 3 },
  4: { color: "red", size: 6 },
  5: { color: "yellow", size: 3 },
  6: { color: "yellow", size: 3 },
  7: { color: "yellow", size: 3 },
  8: { color: "red", size: 6 },
  9: { color: "yellow", size: 3 },
  10: { color: "yellow", size: 3 },
  11: { color: "yellow", size: 3 },
  12: { color: "red", size: 6 },
  13: { color: "yellow", size: 3 },
  14: { color: "yellow", size: 3 },
  15: { color: "yellow", size: 3 },
  16: { color: "red", size: 6 },
  17: { color: "yellow", size: 3 },
  18: { color: "yellow", size: 3 },
  19: { color: "yellow", size: 3 },
  20: { color: "red", size: 6 },
};

// Drawing function
export const drawHand = (predictions, ctx, player) => {
  // Check if we have predictions
  if (predictions.length > 0) {
    // Loop through each prediction
    predictions.forEach((prediction) => {
      // Grab landmarks
      // const landmarks = prediction.landmarks;
      const keypoint = prediction.keypoints;

      //uploading keypoints
      const db = getDatabase()


      update(ref(db, `/playerMouse/${player}`), {
        MouseX: 700 - parseInt(prediction.keypoints[9].x),
        MouseY: parseInt(prediction.keypoints[9].y),
      });

      // Loop through fingers
      for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
        let finger = Object.keys(fingerJoints)[j];
        //  Loop through pairs of joints
        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
          // Get pairs of joints
          const firstJointIndex = fingerJoints[finger][k];
          const secondJointIndex = fingerJoints[finger][k + 1];

          // // Draw path
          // ctx.beginPath();
          // ctx.moveTo(
          //   landmarks[firstJointIndex][0],
          //   landmarks[firstJointIndex][1]
          // );
          // ctx.lineTo(
          //   landmarks[secondJointIndex][0],
          //   landmarks[secondJointIndex][1]
          // );
          // ctx.strokeStyle = "plum";
          // ctx.lineWidth = 4;
          // ctx.stroke();

          // console.log(keypoint[firstJointIndex])
          // Draw path
          ctx.beginPath();
          ctx.moveTo(
            keypoint[firstJointIndex]["x"],
            keypoint[firstJointIndex]["y"]
          );
          ctx.lineTo(
            keypoint[secondJointIndex]["x"],
            keypoint[secondJointIndex]["y"]
          );
          ctx.strokeStyle = "orange";
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      }

      // Loop through landmarks and draw em
      for (let i = 0; i < keypoint.length; i++) {
        // Get x point
        const x = keypoint[i]["x"];
        // Get y point
        const y = keypoint[i]["y"];
        // Start drawing
        ctx.beginPath();
        ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);

        // Set line color
        ctx.fillStyle = style[i]["color"];
        ctx.fill();
      }
      // Loop through landmarks and draw em
      for (let i = 0; i < keypoint.length; i++) {
        // Get x point
        const x = keypoint[i][0];
        // Get y point
        const y = keypoint[i][1];
        // Start drawing
        ctx.beginPath();
        ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);

        // Set line color
        ctx.fillStyle = style[i]["color"];
        ctx.fill();
      }
    });
  }
};
