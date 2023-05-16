import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Team.css';
import SubmitEntriesModal from '../Modals/SubmitEntriesModal';


const TeamScreen = (props) => {

    const queens = [
        <img src={require("../Images/queens/alexis.jpeg")} className="member-icon"/>,
        <img src={require("../Images/queens/darienne.jpeg")} className="member-icon"/>,
        <img src={require("../Images/queens/heidi.jpeg")} className="member-icon"/>,
        <img src={require("../Images/queens/jaymes.jpeg")} className="member-icon"/>,
        <img src={require("../Images/queens/jessica.jpeg")} className="member-icon"/>,
        <img src={require("../Images/queens/jimbo.jpeg")} className="member-icon"/>,
        <img src={require("../Images/queens/kahana.jpeg")} className="member-icon"/>,
        <img src={require("../Images/queens/kandy.jpeg")} className="member-icon"/>,
        <img src={require("../Images/queens/kasha.jpeg")} className="member-icon"/>,
        <img src={require("../Images/queens/lala.jpeg")} className="member-icon"/>,
        <img src={require("../Images/queens/monica.jpeg")} className="member-icon eliminated"/>,
        <img src={require("../Images/queens/naysha.jpeg")} className="member-icon eliminated"/>,
    ]

    const queenNames = [
        "Alexis Michelle",
        "Darienne Lake",
        "Heidi N Closet",
        "Jaymes Mansfield",
        "Jessica Wild",
        "Jimbo",
        "Kahanna Montrese",
        "Kandy Muse",
        "Mrs. Kasha Davis",
        "Lala Ri",
        "Monica Beverly Hillz",
        "Naysha Lopez"
    ]

    const {currUser, setCurrUser} = props;


    const renderQueens = () => {
        return(
            <div className="all-stars">
                {currUser.team.map(element => (
                    <div className="member-container">
                        {queens[element]}
                        <label>{queenNames[element]}</label>
                    </div>
                ))}
            </div>
        )
        
    }

    return (
        <>
        <div className="selection-banner">
            <p>Team {(String)(currUser.username).toUpperCase()}</p>
        </div>
        <p className='instructions-top'>The members of your fantasy team are shown below:</p>

            {renderQueens()}

        </>
    );
}

export default TeamScreen;