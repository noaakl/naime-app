import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Styles from "../App.module.scss";
import PopularNames from './PopularNames';
import Logout from "./Logout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';


const NavBar = () => {
    const username = useSelector((state) => state.reduser.username);

    const [showAbout, setShowAbout] = useState(false);
    const handleAbout = () => setShowAbout(!showAbout);
    return (
        <>
            <Navbar expand="lg" bg='light'>
                <Container fluid>
                    <Navbar.Brand as={Link} to="/">nAIme</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto" navbarScroll>
                            <Nav.Link onClick={handleAbout} variant="Success">About</Nav.Link>
                            <PopularNames />
                            {/* <Nav.Link as={Link} to="/userInfo" style={{ display: username ? '' : 'none' }}>My info</Nav.Link> */}
                        </Nav>
                        <Nav className="ml-auto my-2 my-lg-0" >
                            <Nav.Link as={Link} to="/signUp" style={{ display: !username ? '' : 'none' }}>Sign Up</Nav.Link>
                            <Nav.Link as={Link} to="/login" style={{ display: !username ? '' : 'none' }}>Log In</Nav.Link>
                            <Nav.Link as={Link} to="/userInfo" style={{ display: username ? '' : 'none' }}>My info</Nav.Link>
                            <Logout username={username}/>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


            <div className={Styles.about}>
                <Modal show={showAbout} onHide={handleAbout}>
                    <Modal.Header closeButton>
                        <Modal.Title>nAIme</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={Styles.about_text}>
                        Our nAime website delivers the SpokenName2Vec and GRAFT novelty algorithms along with the Jellyfish package algorithms.
                        Using these algorithms you will be able to retrieve alternative and similar names for a given name query.<br /><br />
                        In this nAime website you will also see different statistics on name searches such as all time top names searched and how many searches included your very own query. You will be able to rank the quality of the retrieved names, sort and filter the results to your liking.<br /><br /><strong>Enjoy our website and happy searching!</strong>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleAbout} style={{ backgroundColor: "green" }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default NavBar;
