import Styles from './App.module.scss'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import PopoverBody from 'react-bootstrap/PopoverBody'
import PopoverHeader from 'react-bootstrap/PopoverHeader'
import Accordion from 'react-bootstrap/Accordion'
// import 'bootstrap/dist/css/bootstrap.min.css';
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
            // console.log(response)
            if (response.data!=={}) {
                console.log((response.data))
                // const data = Object.assign({}, response.data)
                const data = {}
                for(const i in response.data) {
                    const nameData = response.data[i]
                    console.log(nameData)
                    data[nameData[0]] = nameData[1];
                }
                console.log((data))

                setTopSearches(data)
                // console.log(noaa)
            }
                // const data = response.data
            // const data = {k: v for k, v in sorted(results_dict.items(), key=lambda x: x[1])}
            // setName(searchVal)
            // setCount(response.data.count)
        })}

    return (

<div className={Styles.info}>
{/* bsPrefix={Styles.info_accordion} */}
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
    {/* </Accordion.Body>
    <Accordion.Body> */}
    
    {Object.keys(topSearches).map((name) => {
        return (<div key={name} className={Styles.info_accordion}> {'\n'+name}: {topSearches[name]} times </div>)})}
    
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
</div>


        // <>
        //     <OverlayTrigger
        //         trigger="click"
        //         key="info"
        //         placement="right"
        //         overlay={
        //             <Popover id={`popover-popular`}>
        //                 <PopoverHeader bsPrefix={Styles.popover} as="h3"><strong>Top 5 searches:</strong></PopoverHeader>
        //                 <PopoverBody bsPrefix={Styles.popover}>
        //                     {Object.keys(topSearches).map((name) => {
        //                         return `${name}: ${topSearches[name]} times\n`})}
        //                 </PopoverBody>
        //                 {/* <PopoverHeader/> */}
        //             </Popover>
        //         }
        //     >
        //         <svg onClick={() => getPopularNames(searchedName)} className={Styles.info_icon} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48" >
        //             <path fill="#F27054" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M22 22h4v11h-4V22zM26.5 16.5c0 1.379-1.121 2.5-2.5 2.5s-2.5-1.121-2.5-2.5S22.621 14 24 14 26.5 15.121 26.5 16.5z"></path>
        //         </svg>
        //     </OverlayTrigger>
        // </>
    );
}

export default PopularNames;


