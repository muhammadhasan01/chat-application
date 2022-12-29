import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Join from "./components/Join/Join";
import Chat from "./components/Chat";
import "./App.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Join/>}/>
      <Route path="/chat" element={<Chat/>}/>
    </Routes>
  </Router>
)

export default App;
