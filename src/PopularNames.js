import Styles from './App.module.scss'
import Accordion from 'react-bootstrap/Accordion'
import { useState } from 'react'
import axios from "axios";

const PopularNames = ({ searchedName }) => {
    const [topSearches, setTopSearches] = useState({});

    const getPopularNames = (searchVal) => {
        axios({
          method: "GET",
          url: `/popularSearches?name=${searchVal}`
        })
        .then((response) => {
            if (response.data!=={}) {
                console.log((response.data))
                const data = {}
                for(const i in response.data) {
                    const nameData = response.data[i]
                    console.log(nameData)
                    data[nameData[0]] = nameData[1];
                }
                console.log((data))
                setTopSearches(data)
            }
        })}

    return (

<div className={Styles.info}>
<Accordion bsPrefix={Styles.info_accordion} defaultActiveKey="0">
  <Accordion.Item>
    <Accordion.Header onClick={() => getPopularNames(searchedName)}>
        <div className={Styles.info_accordion_title}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;More Info
        </div>
        </Accordion.Header>
    <Accordion.Body>
        <div className={Styles.info_accordion_body_title}>
    <strong>Top 5 searches:</strong>
        </div>
    
    {Object.keys(topSearches).map((name) => {
        return (<div key={name} className={Styles.info_accordion}> {'\n'+name}: {topSearches[name]} times </div>)})}
    
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
</div>
    );
}

export default PopularNames;


