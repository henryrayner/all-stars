import './App.css';
import Navigation from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './Screens/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectionScreen from './Screens/Selection';
import TeamsScreen from './Screens/Teams';
import { useState } from 'react';
import LoginModal from './Modals/LoginModal';

function App() {
  const [loginVisibleFlag, setLoginVisibleFlag] = useState(false);

return (
  <>
    {/* This is the alias of BrowserRouter i.e. Router */}
    <Navigation loginVisibleFlag={loginVisibleFlag} setLoginVisibleFlag={setLoginVisibleFlag}/>
    <Router>
      <Routes>
        <Route exact path="/" element={<HomeScreen/>} />
        <Route path="/makeSelection" element={<SelectionScreen/>} />
        <Route path="/teams" element={<TeamsScreen/>} />
      </Routes>
      <LoginModal visibleFlag={loginVisibleFlag} setVisibleFlag={setLoginVisibleFlag}/>
    </Router>
  </>
);
}

export default App;
