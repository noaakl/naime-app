import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { setQuery, editQueryNames } from '../store/action';
import Styles from '../App.module.scss'
import axios from "axios";
import { Row, Col, Button, Modal, Dropdown, Accordion, Form } from 'react-bootstrap'
import { ListUl } from 'react-bootstrap-icons';
import AlgorithmsAccordion from "./AlgorithmsAccordion";
// import QueryModal from "./QueryModal";

const QueryNameInput = ({ name, nameIndex, numberIndex, algorithmsData }) => {
    const dispatch = useDispatch()
    // const queryModal = useSelector((state) => state.reduser.showQueryModal);
    const [showQueryModal, setShowQueryModal] = useState(false)
    const [queryNameValue, setQueryNameValue] = useState(name)
    const algorithmsNames = Object.keys(algorithmsData[nameIndex])
    const query = useSelector((state) => state.reduser.query);
    console.log(query)
    const queryNames = useSelector((state) => state.reduser.queryNames);

    const handleSelectName = (selectedName) => {
        // console.log("noa")
        setQueryNameValue(selectedName)
        dispatch(editQueryNames(selectedName, numberIndex, nameIndex))
        /////
        const userQuery = getUserQuery()
        console.log(userQuery)
        dispatch(setQuery(userQuery))
        setShowQueryModal(false)
    }

        
    const getUserQuery = () => {
        axios.post('/api/userQuery', {queryNames: queryNames})
            .then((response) => {
                console.log(response.data['query'])
                const userQuery = response.data['query']
                dispatch(setQuery(userQuery))
                // return(response.data['query'])
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Form>
        <Form.Group as={Row} controlId="formPlaintextEmail" style={{margin:"0px"}}>
        {/* <Col key={`${name}_${nameIndex}`}> */}
            <Row lg={2} md={2} sm={2} xs={2} className="g-4" >
                <Col className="g-1" style={{margin:"0px"}}>
                    <Form.Control id={`${name}_${numberIndex}`} key={`${name}_${numberIndex}`} defaultValue={queryNameValue} style={{ textAlign: "center", display: "inline", boxSizing: "border-box" }} />
                </Col>
                <Col className="g-1" style={{margin:"0px", textAlign:"left"}}>
                    {/* <Dropdown style={{ display: "inline" }}> */}
                    {/* <Dropdown.Toggle className={Styles.sort} variant="icon" bsPrefix="Button" size="xs" id="dropdown-basic"> */}
                    <ListUl as="button" style={{ marginBottom: "0px" }} onClick={() => setShowQueryModal(true)} />
                    {/* </Dropdown.Toggle> */}

                    <Modal show={showQueryModal} onHide={()=>setShowQueryModal(false)}>
                        {/* // animation={false}
                        // keyboard={false}> */}
                        {/* // aria-labelledby="contained-modal-title-vcenter"
// centered> */}
                        {/* backdrop="static" */}
                        <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body >
                        </Modal.Body>
                        <Accordion alwaysOpen>
                            {
                                Array.from({ length: algorithmsNames.length })
                                    .map((_, algorithmIndex) => {
                                        const algorithm = algorithmsNames[algorithmIndex]
                                        const data = algorithmsData[nameIndex][algorithm]
                                        return (
                                            <Accordion.Item eventKey={algorithmIndex} key={algorithm}>
                                                <Accordion.Header>{algorithm}</Accordion.Header>
                                                <Accordion.Body>
                                                    {data.map((name) => {
                                                        return (
                                                            <div key={`${algorithm}_${name.candidate}`}
                                                                as='button'
                                                                onClick={() => handleSelectName(name.candidate)}
                                                                className={Styles.result}>
                                                                {name.candidate}
                                                            </div>
                                                        )
                                                    })}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )
                                    })}
                        </Accordion>
                        {/* <Modal.Footer>
       <Button variant="secondary" onClick={handleCancel}>
           Close
       </Button>
       <Button variant="success" onClick={handleSave}>
           Save Changes
       </Button>
   </Modal.Footer> */}
                    </Modal>
                </Col>
            </Row>
        {/* </Col> */}
        </Form.Group>
        </Form>);
}

export default QueryNameInput;
