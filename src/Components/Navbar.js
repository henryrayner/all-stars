import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css';
import { useState } from 'react';
import LoginModal from '../Modals/LoginModal';
import Lipstick from "./Lipstick";

const Navigation = (props) => {
    const loginVisibleFlag = props.loginVisibleFlag;
    const setLoginVisibleFlag = props.setLoginVisibleFlag;

    const lipstickProps = {
        text: 'text'
    }

    return(
            <Navbar expand="lg" className="custom">
                <Container className="container-fluid">
                <Navbar.Brand href="#home" className='logo'><img src={require("../Images/rupaul-logo.png")} width="55px" className='logo'/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="container-fluid">
                    <Nav.Link href="/" className="lipstick"><Lipstick text="Home"/></Nav.Link>
                    <Nav.Link href="/makeSelection" className="lipstick"><Lipstick text="Home"/></Nav.Link>
                    <NavDropdown title={<img src={require("../Images/leaderboard.png")} width="125px"/>} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                        Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                        Separated link
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#link" className="ms-auto"><img src={require("../Images/mySelection.png")} width="125px" onClick={()=>setLoginVisibleFlag(!loginVisibleFlag)}/></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>

    )
}

export default Navigation;
