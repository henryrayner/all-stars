import { Link } from "react-router-dom";
import './Modal.css';
import axios from "axios";
import { useState, useEffect } from 'react';

const LoginModal = (props) => {
    const visibleFlag = props.visibleFlag;
    const setVisibleFlag = props.setVisibleFlag;
    const [isLoading, setIsLoading] = useState(false)
    const [incorrectFlag, setIncorrectFlag] = useState(false);

    const {isLoggedIn, loginMode, setLoginMode} = props;
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);



    const IncorrectText = (
        incorrectFlag && <p className="incorrect">Username or password is incorrect.</p>
    )


    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const handleCloseClick = (e) => {
        setVisibleFlag(false);
    }

    async function handleCreateClick(e) {
        await (onCreate(e))
        .then(setVisibleFlag(false));
    }

    async function handleLoginClick(e) {
        await onSubmit(e);
    }

    const LoginMode = (
         <>
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
            {IncorrectText}
            <p className="create" onClick={() => setLoginMode(false)}>Create Account</p>
            <button className='close-button' onClick={(e)=>handleLoginClick(e)}>Sign In</button></>
    )

    const CreateMode = (
        <>
            <h3>Create Account</h3>
            <label className="login-label">Username</label>
            <input type="text"
                    required={true}
                    className="login-input"
                    id = "username"
                    placeholder="Choose a username"
                    onChange={(e)=>setForm({...form, username: e.target.value})}/>

            <label className="login-label">Password</label>
            <input type="password"
                    required={true}
                    className="login-input"
                    id = "username"
                    placeholder="Choose a password"
                    onChange={(e)=>setForm({...form, password: e.target.value})}/>
            <br/>
            <button className='create-button' onClick={(e)=>handleCreateClick(e)} disabled={isLoading}>Create Account</button></>
    )

    async function onSubmit(e) {
        e.preventDefault();
        const person = { ...form };
        let data = {};
        
        // send the username and password to the server
        await axios.get(`http://localhost:5000/record/${person.username}`)
          .then(function (response) {
            // handle success
            data = response.data;
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      
        if (data !== null) {
            // compare the user's entered password with the hashed password
            const passwordsMatch = bcrypt.compareSync(person.password, data.password);
            if (passwordsMatch) {
                // the user entered the correct password
                localStorage.setItem('user', JSON.stringify(data));
                window.dispatchEvent(new Event("storage"));
                setIncorrectFlag(false);
                setVisibleFlag(false);
            } else {
                // the user entered an incorrect password
                setIncorrectFlag(true)
                setVisibleFlag(true);
                return;
            }
        }
        else if(!isLoggedIn){

            setIncorrectFlag(true)
            setVisibleFlag(true);
            return;
        }
      }
      

    async function onCreate(e) {
        e.preventDefault();
    
        // When a post request is sent to the create url, we'll add a new record to the database.
         var newPerson = {username:form.username, password:form.password};

        // hash the user's password with the salt
        var hash = bcrypt.hashSync(newPerson.password, salt);
        newPerson.password = hash;

        newPerson = {...newPerson, draftOrder: []}
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
        onSubmit(e);
        setForm({ username: "", password: ""});
    }

    return (
        <>
        {visibleFlag && <div className='shadow'></div>}
        {visibleFlag &&
            <div className='login-modal'>
                <img src={require("../Images/remove.png")} onClick={()=>handleCloseClick()} className="x-icon"/>
                {console.log(loginMode)}
                {loginMode ? LoginMode : CreateMode}
            </div>}
        </>
    );
}

export default LoginModal;