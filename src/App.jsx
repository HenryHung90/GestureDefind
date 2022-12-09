import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HandPose from "./HandPose";
import Camera from "./Camera";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/playerone" element={<HandPose player={"one"} />}></Route>
        <Route path="/playertwo" element={<HandPose player={"two"} />}></Route>
        <Route path="/Camera" element={<Camera />}></Route>
      </Routes>
    </Router>
  );
};
export default App;
