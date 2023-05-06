import './App.css';
import Navigation from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './Screens/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectionScreen from './Screens/Selection';
import TeamsScreen from './Screens/Teams';
import { useState, useEffect } from 'react';
import LoginModal from './Modals/LoginModal';
import UserOrder from './Screens/UserOrder';

function App() {
  const [loginVisibleFlag, setLoginVisibleFlag] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currUser, setCurrUser] = useState({});
  const [loginMode, setLoginMode] = useState(true);

  async function localStorageSetHandler(){
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
        const foundUser = (loggedInUser);
        setCurrUser(foundUser);
        setIsLoggedIn(true);
        setLoginMode(true);
    }
    else {
      setIsLoggedIn(false);
    }
  }
  useEffect(() => {
    localStorageSetHandler();
  }, []);
  
  document.addEventListener("itemInserted", localStorageSetHandler, false);


return (
  <>
    {/* This is the alias of BrowserRouter i.e. Router */}
    <Navigation loginVisibleFlag={loginVisibleFlag} setLoginVisibleFlag={setLoginVisibleFlag} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currUser={currUser} setCurrUser={setCurrUser} loginMode={loginMode} setLoginMode={setLoginMode}/>
    <Router basename="/all-stars">
      <Routes>
        <Route exact path="/all-stars" element={<HomeScreen isLoggedIn={isLoggedIn} loginVisibleFlag={loginVisibleFlag} setLoginVisibleFlag={setLoginVisibleFlag} currUser={currUser}/>} />
        <Route path="/all-stars/makeSelection" element={<SelectionScreen currUser = {currUser} setCurrUser={setCurrUser}/>} />
        <Route path="/all-stars/teams" element={<TeamsScreen/>} />
        <Route path={`/all-stars/${currUser.username}-selection`} element={<UserOrder currUser={currUser}/>}/>
      </Routes>
      <LoginModal visibleFlag={loginVisibleFlag} setVisibleFlag={setLoginVisibleFlag}  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currUser={currUser} setCurrUser={setCurrUser}loginMode={loginMode} setLoginMode={setLoginMode}/>
    </Router>
  </>
);
}

export default App;
