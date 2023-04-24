import { Link } from "react-router-dom";
import './Modal.css';
import axios from "axios";
import { useState } from 'react';

const LoginModal = (props) => {
    const visibleFlag = props.visibleFlag;
    const setVisibleFlag = props.setVisibleFlag;

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const handleCloseClick = (e) => {
        setVisibleFlag(false);
        onCreate(e);
    }

    const loginMode = () => {

    }

    async function onSubmit(e) {
        e.preventDefault();
        const person = {...form};
        let data = {};
        // send the username and password to the server
        await axios.get(
            `http://localhost:5000/record/${encodeURIComponent(person.username)}` 
          ).then(function (response) {
            // handle success
            data = JSON.stringify(response.data);
          }).catch(function (error) {
            // handle error
            console.log(error);
          })
        
        if(data !== 'null'){
            console.log(data);
            localStorage.setItem('user', data);
            window.dispatchEvent(new Event("storage"));
        }
        else{
            console.log(data)
        }
        // store the user in localStorage

        localStorage.setItem('user', data);
    }

    async function onCreate(e) {
        e.preventDefault();
    
        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = form;
        await fetch("http://localhost:5000/record/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
        })
        .catch(error => {
        window.alert(error);
        return;
        });
    
        setForm({ username: "", password: ""});
    }

    return (
        <>
        {visibleFlag && <div className='shadow'></div>}
        {visibleFlag &&
            <div className='login-modal'>
                <img src={require("../Images/remove.png")} onClick={()=>handleCloseClick()} className="x-icon"/>
                <h3>Log In</h3>
                <label className="login-label">Username</label>
                <input type="text"
                        required={true}
                        className="login-input"
                        id = "username"
                        placeholder="Enter username"
                        onChange={(e)=>setForm({...form, username: e.target.value})}/>

                <label className="login-label">Password</label>
                <input type="password"
                        required={true}
                        className="login-input"
                        id = "username"
                        placeholder="Enter password"
                        onChange={(e)=>setForm({...form, password: e.target.value})}/>
                <br/>
                <p className="create">Create Account</p>
                <Link to="/teams"><button className='close-button' onClick={(e)=>handleCloseClick(e)}>Sign In</button></Link>
            </div>}
        </>
    );
}

export default LoginModal;