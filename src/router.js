import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HandPose from './HandPose'

const router = () =>{
    <Router>
        <Routes>
            <Route path="/playerone" element={<HandPose player={"one"}/>}></Route>
            <Route path="/playertwo" element={<HandPose player={"two"}/>}></Route>
        </Routes>
    </Router>
}