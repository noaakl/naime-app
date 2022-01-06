import Styles from './App.module.scss'
// import { useState } from 'react'
// import axios from "axios";
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <Nav fill variant="tabs" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="/home">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Loooonger NavLink</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">Link</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                        Disabled
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}

export default Menu;





