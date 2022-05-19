// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Styles from '../App.module.scss'
// import { addQuery, editQuery, showQueryModal, hideQueryModal } from '../store/action';
// import { Row, Col, Button, Modal, Dropdown, Accordion } from 'react-bootstrap'


// const QueryModal = ({show, algorithmsNames, algorithmsData, nameIndex}) => {
//     const dispatch = useDispatch()

//     const handleSelectName = (selectedName) => {
//         setQueryNameValue(selectedName)
//         // dispatch(editQuery(selectedName, ))
//     }

//     return (
//         <Modal show={show} onHide={dispatch(hideQueryModal)} animation={false}
//             keyboard={false}>
//             {/* // aria-labelledby="contained-modal-title-vcenter"
// // centered> */}
//             {/* backdrop="static" */}
//             <Modal.Header closeButton>
//                 <Modal.Title>Modal heading</Modal.Title>
//             </Modal.Header>
//             <Modal.Body >
//             </Modal.Body>
//             <Accordion alwaysOpen>
//                 {
//                     Array.from({ length: algorithmsNames.length })
//                         .map((_, algorithmIndex) => {
//                             const algorithm = algorithmsNames[algorithmIndex]
//                             const data = algorithmsData[nameIndex][algorithm]
//                             return (
//                                 <Accordion.Item eventKey={algorithmIndex} key={algorithm}>
//                                     <Accordion.Header>{algorithm}</Accordion.Header>
//                                     <Accordion.Body>
//                                         {data.map((name) => {
//                                             return (
//                                                 <div key={`${algorithm}_${name.candidate}`}
//                                                     as='button'
//                                                     onClick={() => handleSelectName(name.candidate)}
//                                                     className={Styles.result}>
//                                                     {name.candidate}
//                                                 </div>
//                                             )
//                                         })}
//                                     </Accordion.Body>
//                                 </Accordion.Item>
//                             )
//                         })}
//             </Accordion>
//             {/* <Modal.Footer>
//        <Button variant="secondary" onClick={handleCancel}>
//            Close
//        </Button>
//        <Button variant="success" onClick={handleSave}>
//            Save Changes
//        </Button>
//    </Modal.Footer> */}
//         </Modal>
//     );
// }

// //link to see feedback: https://feeder.sh/project/6283f296e9d2bc0004662ce3

// export default QueryModal;
