import Styles from './App.module.scss'
// import { useState } from 'react'
// import axios from "axios";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
// import 'bootstrap/dist/css/bootstrap.min.css';

const Menu = () => {
    // const [count, setCount] = useState(0);
    // const [name, setName] = useState(searchedName);
    // // const [target, setTarget] = useState(null);
    // // const ref = useRef(null);


    // const getNameInfo = (searchVal) => {
    //     axios({
    //         method: "GET",
    //         url: `/searchList?name=${searchVal}`
    //     })
    //         .then((response) => {
    //             setName(searchVal)
    //             setCount(response.data.count)
    //         })
    // }

    return (
        <div className={Styles.menu}>
            <Navbar fixed="top"  bg="light" >
                <Container>
                    {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                    {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                    {/* <Navbar.Collapse id="basic-navbar-nav"> */}
                        <Nav className="me-auto">
                            {/* <Nav.Link href="#home">Home</Nav.Link> */}
                            <Nav.Item >|</Nav.Item>
                            <Nav.Link href="#link">About</Nav.Link>
                            {/* <Nav.Item >|</Nav.Item> */}
                            {/* <Nav.Link href="#link">Information</Nav.Link> */}
                        </Nav>
                    {/* </Navbar.Collapse> */}
                </Container>
            </Navbar>
        </div>
    );
}

export default Menu;





