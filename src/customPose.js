import * as fp from 'fingerpose'

const fingerGunGesture = new fp.GestureDescription('finger_gun')
const fistGesture = new fp.GestureDescription('fist')
const victoryGesture = new fp.GestureDescription('victory')

//fingerGun//
// Thumb 
fingerGunGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0)
fingerGunGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 0.5);
fingerGunGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 0.5);
fingerGunGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 0.5);


// Index
fingerGunGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0)
fingerGunGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalLeft, 0.4);
fingerGunGesture.addDirection(fp.Finger.Index, fp.FingerDirection.HorizontalRight, 0.4);
fingerGunGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 0.4);
fingerGunGesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalDown, 0.4);
fingerGunGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 0.4);
fingerGunGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpLeft, 0.4);
fingerGunGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownRight, 0.4);
fingerGunGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalDownLeft, 0.4);

//other finger
for (let finger of [fp.Finger.Middle,fp.Finger.Ring, fp.Finger.Pinky]) {
    fingerGunGesture.addCurl(finger, fp.FingerCurl.FullCurl, 0.8);
}

//fist//
for (let finger of [fp.Finger.Thumb,fp.Finger.Index,fp.Finger.Middle,fp.Finger.Ring, fp.Finger.Pinky]) {
    fistGesture.addCurl(finger, fp.FingerCurl.FullCurl, 0.8);
}

//victory





export { fingerGunGesture , fistGesture }