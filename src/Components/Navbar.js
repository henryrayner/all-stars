import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css';
import { useEffect, useState } from 'react';
import LoginModal from '../Modals/LoginModal';
import Lipstick from "./Lipstick";

const Navigation = (props) => {
    const {loginVisibleFlag, setLoginVisibleFlag, isLoggedIn, setIsLoggedIn, currUser, setCurrUser, loginMode, setLoginMode} = props;


    useEffect(() => {
        
        function updateUser() {
            // When local storage changes, dump the list to
            // the console.
            const loggedInUser = JSON.parse(localStorage.getItem("user"));
            if (loggedInUser) {
                const foundUser = (loggedInUser);
                setCurrUser(foundUser);
                setIsLoggedIn(true);
            }
        }
        window.addEventListener('storage', updateUser );    

        return () => {
            window.removeEventListener('storage', updateUser)
          }
    }, [])

    async function handleLogOut() {
        localStorage.removeItem('user');
        setCurrUser({});
        setLoginMode(true);
        setIsLoggedIn(false);
    }


    const LogInButton = (
        !isLoggedIn && <Nav.Link href="" className="ms-auto"   onClick={() => setLoginVisibleFlag(!loginVisibleFlag)}><Lipstick text="LOG IN"/></Nav.Link>
    )

    const AccountDropdown = (
        isLoggedIn &&
        <NavDropdown title={<Lipstick text={currUser === "" || currUser.username === undefined ? "LOG IN" : (String)(currUser.username).toUpperCase()} />} id="basic-nav-dropdown" className="ms-auto">
            <NavDropdown.Item href="">My Team</NavDropdown.Item>
            <NavDropdown.Item href="">My Score</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="" onClick={()=>handleLogOut()}>Log Out</NavDropdown.Item>
        </NavDropdown>
    )

    return(
            <Navbar expand="lg" className="custom">
                <Container className="container-fluid">
                <Navbar.Brand href="/" className='logo'><img src={require("../Images/rupaul-logo.png")} width="55px" className='logo'/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="container-fluid">
                    <Nav.Link href="/" className="lipstick"><Lipstick text="HOME"/></Nav.Link>
                    {isLoggedIn && <Nav.Link href={currUser.draftOrder.length !== 0 ? `#/${currUser.username}-selection`:"#/makeSelection"} className="lipstick"><Lipstick text="MY RANKING"/></Nav.Link>}
                    <Nav.Link href="" className="lipstick" disabled={true}><Lipstick text="LEADERBOARD"/></Nav.Link>
                    {LogInButton}
                    {AccountDropdown}
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>

    )
}

export default Navigation;
