import Styles from './App.module.scss'
import Accordion from 'react-bootstrap/Accordion'
import { useState } from 'react'
import axios from "axios";
import { NavDropdown } from 'react-bootstrap';

const PopularNames = ({ searchedName }) => {
    const [topSearches, setTopSearches] = useState({});

    const getPopularNames = (searchVal) => {
        axios({
          method: "GET",
          url: `/popularSearches?name=${searchVal}`
        })
        .then((response) => {
            if (response.data!=={}) {
                const data = {}
                for(const i in response.data) {
                    const nameData = response.data[i]
                    data[nameData[0]] = nameData[1];
                }
                setTopSearches(data)
            }
        })}

    return (
    <NavDropdown title="Top 5 searches" id="navbarScrollingDropdown"  onClick={() => getPopularNames(searchedName)}>
    {Object.keys(topSearches).map((name) => {
         return (<NavDropdown.Item key={name} className={Styles.info_accordion}> {'\n'+name}: {topSearches[name]} times </NavDropdown.Item>)})}
  </NavDropdown>

    );}

// {/* <div className={Styles.info}> */}
// {/* <Accordion bsPrefix={Styles.info_accordion} defaultActiveKey="0"> */}
//   <Accordion.Item>
    // <Accordion.Header onClick={() => getPopularNames(searchedName)}>
        // <div className={Styles.info_accordion_title}>
        // <b>Top 5 Searches</b>
        // </div>
        // </Accordion.Header>
    // <Accordion.Body>
        // <div className={Styles.info_accordion_body_title}>
    // {/* <strong>Top 5 searches:</strong> */}
        // </div>
    
    // {Object.keys(topSearches).map((name) => {
        // return (<div key={name} className={Styles.info_accordion}> {'\n'+name}: {topSearches[name]} times </div>)})}

    // </Accordion.Body>
//   </Accordion.Item>
// </Accordion>
// </div>
    // );
// }

export default PopularNames;


