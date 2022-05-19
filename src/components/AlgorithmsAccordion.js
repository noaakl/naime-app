// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import Styles from '../App.module.scss'
// import axios from "axios";
// import { Row, Col, Button, Modal, Dropdown, Accordion } from 'react-bootstrap'
// import { ListUl } from 'react-bootstrap-icons';
// import SearchEngines from "./SearchEngines"

// const AlgorithmsAccordion = ({algorithmsNames, algorithmsData, nameIndex}) => {
//   return (
//     <Accordion alwaysOpen>
//     {
//         Array.from({ length: algorithmsNames.length })
//             .map((_, algorithmIndex) => {
//                 const algorithm = algorithmsNames[algorithmIndex]
//                 const data = algorithmsData[nameIndex][algorithm]
//                 console.log(algorithmsData)
//                 console.log(algorithm)
//                 return (
//                     <Accordion.Item eventKey={algorithmIndex}>
//                         <Accordion.Header>{algorithm}</Accordion.Header>
//                         <Accordion.Body>
//                             {data.map((name) => {
//                                 return (
//                                     <div key={`${algorithm}_${name.candidate}`} className={Styles.result}>{name.candidate}
//                                     </div>
//                                 )
//                             })}
//                         </Accordion.Body>
//                     </Accordion.Item>
//                 )
//             })}
// </Accordion>
//     );
//   }

// export default AlgorithmsAccordion;
