import './App.css';
import Navigation from './Components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './Screens/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    <BrowserRouter basename="/all-stars">
    <Navigation loginVisibleFlag={loginVisibleFlag} setLoginVisibleFlag={setLoginVisibleFlag} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currUser={currUser} setCurrUser={setCurrUser} loginMode={loginMode} setLoginMode={setLoginMode}/>
      <Routes>
        <Route path="/" element={<HomeScreen isLoggedIn={isLoggedIn} loginVisibleFlag={loginVisibleFlag} setLoginVisibleFlag={setLoginVisibleFlag} currUser={currUser}/>} />
        <Route path="/makeSelection" element={<SelectionScreen currUser = {currUser} setCurrUser={setCurrUser}/>} />
        <Route path="/teams" element={<TeamsScreen/>} />
        <Route path={`/${currUser.username}-selection`} element={<UserOrder currUser={currUser}/>}/>
      </Routes>
      <LoginModal visibleFlag={loginVisibleFlag} setVisibleFlag={setLoginVisibleFlag}  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currUser={currUser} setCurrUser={setCurrUser}loginMode={loginMode} setLoginMode={setLoginMode}/>
    </BrowserRouter>
  </>
);
}

export default App;
