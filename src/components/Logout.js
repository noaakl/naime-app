import Styles from '../App.module.scss'
import axios from "axios";
import { NavDropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from '../store/action';

const Logout = ({ username }) => {
    const dispatch = useDispatch()

    // const Logout = () => {
    //     axios({
    //         method: "POST",
    //         url: `/logout`
    //     })
    //         .then((response) => {
    //             console.log(response)
    //             }
    //         )
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }

    return (
        <NavDropdown title={`Hello ${username}`} id="navbarScrollingDropdown" style={{ display: username ? '' : 'none' }}>
            <NavDropdown.Item className={Styles.info_accordion} onClick={()=>dispatch(logout())}> Log Out </NavDropdown.Item>
        </NavDropdown>

    );
}

export default Logout;


