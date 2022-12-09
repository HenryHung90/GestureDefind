import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HandPose from './HandPose'

const App = () =>{
    <Router>
        <Routes>
            <Route path="/playerone" element={<HandPose player={"one"}/>}></Route>
            <Route path="/playertwo" element={<HandPose player={"two"}/>}></Route>
        </Routes>
    </Router>
}
export default App