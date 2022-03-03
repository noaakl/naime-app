import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SingUp from "./SignUp";
import { useState } from 'react';
// import Noaa from "./noaa";
import Styles from "./App.module.scss";
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import PopularNames from './PopularNames';
import Login from "./Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';


export default function App() {
  const [showAbout, setShowAbout] = useState(false);
  const handleAbout = () => setShowAbout(!showAbout);
  return (
    <>
        <Navbar expand="lg" bg='light'>
        <Container fluid>
        <Navbar.Brand href="/">nAIme</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto" navbarScroll>
                <Nav.Link  onClick={handleAbout}  variant="Success">About</Nav.Link>
                <PopularNames />
             </Nav>
            <Nav className="ml-auto my-2 my-lg-0" >
                <Nav.Link href="/signUp">Sign Up</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signUp" element={<SingUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>

    <div className={Styles.about}>
                <Modal show={showAbout} onHide={handleAbout}>
                    <Modal.Header closeButton>
                        <Modal.Title>nAIme</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={Styles.about_text}>
                    Our nAime website delivers the SpokenName2Vec and GRAFT novelty algorithms along with the Jellyfish package algorithms.
Using these algorithms you will be able to retrieve alternative and similar names for a given name query.<br/><br/>
In this nAime website you will also see different statistics on name searches such as all time top names searched and how many searches included your very own query. You will be able to rank the quality of the retrieved names, sort and filter the results to your liking.<br/><br/><strong>Enjoy our website and happy searching!</strong> 
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleAbout} style={{backgroundColor:"green"}}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));