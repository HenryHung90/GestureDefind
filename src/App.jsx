import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HandPose from "./HandPose";
import Camera from "./Camera";
import HomePage from './HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/playerone" element={<HandPose player={"one"} />}></Route>
        <Route path="/playertwo" element={<HandPose player={"two"} />}></Route>
        <Route path="/Camera" element={<Camera />}></Route>
        <Route path="*" element={<HomePage/>}></Route>
      </Routes>
    </Router>
  );
};
export default App;
