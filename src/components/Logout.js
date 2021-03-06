import React, { useState } from "react";
import Styles from '../App.module.scss'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../store/action';
import { NavDropdown } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

const Logout = ({ username }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [show, setShow] = useState(false);


    const handleShow = () => setShow(!show);

    const Logout = () => {
        handleShow()
        dispatch(logout())
        navigate("/");
    }

    return (
        <>
            <NavDropdown title={`Hello ${username}`} id="navbarScrollingDropdown" style={{ display: username ? '' : 'none' }}>
                <NavDropdown.Item className={Styles.info_accordion} onClick={() => setShow(true)}> Log Out </NavDropdown.Item>
            </NavDropdown>
            <div className={Styles.about}>
                <Modal show={show} onHide={handleShow}>
                    <Modal.Body>Are you sure you want to log out?</Modal.Body>
                    <Modal.Footer>
                        <Button data-cy="no" variant="secondary" onClick={handleShow} style={{ backgroundColor: 'rgb(95, 158, 124)' }}>
                            No
                        </Button>
                        <Button data-cy="yes" variant="secondary" onClick={Logout}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default Logout;
