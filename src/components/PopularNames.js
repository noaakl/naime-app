import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from "axios";
import { Row, Col } from 'react-bootstrap';

const PopularNames = ({ searchedName }) => {
    const [topSearches, setTopSearches] = useState({"James": 137,
"Anton": 129, "Noa": 122, "Guy": 117, "Tal": 113});

    const getPopularNames = (searchVal) => {
        axios({
          method: "GET",
          url: `/api/popularSearches?name=${searchVal}`
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

    // useEffect(() => {
    //         getPopularNames(searchedName)
    //       }, [])

    return (
//     <NavDropdown title="Top 5 searches" id="navbarScrollingDropdown"  onClick={() => getPopularNames(searchedName)}>
//     {Object.keys(topSearches).map((name) => {
//          return (<NavDropdown.Item key={name} className={Styles.info_accordion}> {'\n'+name}: {topSearches[name]} times </NavDropdown.Item>)})}
//   </NavDropdown>
      <Col>
      {Object.keys(topSearches).map((name) => {
           return (<Row key={name} style={{margin:"5px"}}> <span><Link to={`/search/${name}`}>{'\n'+name}</Link>: {topSearches[name]} times </span></Row>)})}
    </Col>

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


