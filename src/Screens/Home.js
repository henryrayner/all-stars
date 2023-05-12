import './Home.css';
import React, { Component, useState } from "react";
import { Link } from 'react-router-dom';



const HomeScreen = (props) => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [mins, setMins] = useState(0);
    const [secs, setSecs] = useState(0);
    const [endtime, setEndtime] = useState(new Date() < new Date(2023, 4, 12 , 3, 0, 0) ? new Date(2023, 4, 12 , 3, 0, 0)  : getFridayOfCurrentWeek())

    const {
        loginVisibileFlag,
        setLoginVisibleFlag,
        isLoggedIn,
        currUser
    } = props;

    function getFridayOfCurrentWeek() {
        const today = new Date();
        const firstDayOfThisWeek = today.getDate() - today.getDay() + 1;
        const fifthDayOfThisWeek = firstDayOfThisWeek + 4;
        var currentFriday;

        if(today.getDay() === 6)
            currentFriday = new Date(today.setDate(fifthDayOfThisWeek+7));
        else
            currentFriday = new Date(today.setDate(fifthDayOfThisWeek));
        currentFriday.setHours(3);
        currentFriday.setMinutes(0);
        currentFriday.setSeconds(0);
        return currentFriday;
    }

    function getTimeRemaining(endtime){
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor( (total/1000) % 60 );
        const minutes = Math.floor( (total/1000/60) % 60 );
        const hours = Math.floor( (total/(1000*60*60)) % 24 );
        const days = Math.floor( total/(1000*60*60*24) );
      
        return {
          total,
          days,
          hours,
          minutes,
          seconds
        };
    }

    const timeinterval = setInterval(() => {
        setEndtime(new Date() < new Date(2023, 4, 12 , 3, 0, 0) ? new Date(2023, 4, 12 , 3, 0, 0)  : getFridayOfCurrentWeek());
        const t = getTimeRemaining(endtime);
        setDays(t.days);
        setHours(t.hours);
        setMins(t.minutes);
        setSecs(t.seconds)
    },1000)
    
    const countDown = (
        <div className='countdown'>
            <p>Next Episode in:</p>
            <br></br>
            <p>{days} days {hours} hours {mins} minutes {secs} seconds</p>
            <br></br><br></br>
        </div>
    )

    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    const ButtonBar = (
        (!isLoggedIn && <div className='title-message'>
            Be sure to log in and select your draft picks before the first episode on May 12, 2023!
        </div>) ||
         ((isLoggedIn && currUser.draftOrder.length == 0) && <Link to="/makeSelection"><button className='button'>
            Select Draft
        </button></Link>) ||

        ((isLoggedIn && currUser.draftOrder.length > 0) && <Link to={`/${currUser.username}-selection`}><button className='button'>
        View My Ranking
        </button></Link>)

    )

    return(
    <>
        <div className="banner">
            <p className='banner'>Welcome to Henry's Official <br/> Fantasy Drag Race!</p>
        </div>
        <img src={require("../Images/main-image.jpeg")} className="main-image"></img>
        {countDown}
        {ButtonBar}
    </>
    )
}


export default HomeScreen;