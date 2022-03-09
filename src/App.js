import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import store from './store/store'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import SingUp from "./components/SignUp";
import { useState } from 'react';
import Styles from "./App.module.scss";
import PopularNames from './components/PopularNames';
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import NavBar from "./components/NavBar";



export default function App() {
  const [showAbout, setShowAbout] = useState(false);
  const handleAbout = () => setShowAbout(!showAbout);
  return (
    <Provider store={store}>
    <BrowserRouter>
    <NavBar/>
    
    {/* <Navbar expand="lg" bg='light'>
        <Container fluid>
        <Navbar.Brand as={Link} to="/">nAIme</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto" navbarScroll>
                <Nav.Link  onClick={handleAbout}  variant="Success">About</Nav.Link>
                <PopularNames />
             </Nav>
            <Nav className="ml-auto my-2 my-lg-0" >
                <Nav.Link as={Link} to="/signUp">Sign Up</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar> */}
    
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signUp" element={<SingUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>



    {/* <div className={Styles.about}>
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
            </div> */}
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));