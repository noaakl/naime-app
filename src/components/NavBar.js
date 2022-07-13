import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';


const NavBar = () => {
    const username = useSelector((state) => state.reduser.username);

    return (
        <>
            <Navbar expand="lg" bg='light'>
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">nAIme</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto" navbarScroll>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                            <Nav.Link as={Link} to="/AlgorithmsInfo">Algorithms</Nav.Link>
                            <Nav.Link as={Link} to="/" onClick={() => window.open('http://naime.data4good.io/', '_blank').focus()} >Project</Nav.Link>
                            {/* <Nav.Link as='a' href="http://naime.data4good.io/" target="_blank">Project</Nav.Link> */}
                            {/* <Link to={{ pathname: "https://example.com" }} target="_blank" /> */}

                        </Nav>
                        <Nav className="ml-auto my-2 my-lg-0" >
                            <Nav.Link as={Link} to="/signUp" style={{ display: !username ? '' : 'none' }}>Sign Up</Nav.Link>
                            <Nav.Link as={Link} to="/login" style={{ display: !username ? '' : 'none' }}>Log In</Nav.Link>
                            <Nav.Link as={Link} to="/userInfo" style={{ display: username ? '' : 'none' }}>My Info</Nav.Link>
                            <Logout username={username} />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;
