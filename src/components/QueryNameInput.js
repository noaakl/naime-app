import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { setQuery, editQueryNames } from '../store/action';
import Styles from '../App.module.scss'
import axios from "axios";
import { Row, Col, Card, Button, Modal, Dropdown, Accordion, Form } from 'react-bootstrap'
import { ListUl } from 'react-bootstrap-icons';
import AlgorithmsAccordion from "./AlgorithmsAccordion";
// import QueryModal from "./QueryModal";

const QueryNameInput = ({ name, nameIndex, numberIndex, algorithmsData }) => {
    const dispatch = useDispatch()
    // const queryModal = useSelector((state) => state.reduser.showQueryModal);
    const [showQueryModal, setShowQueryModal] = useState(false)
    const [queryNameValue, setQueryNameValue] = useState(name)
    console.log(algorithmsData)
    console.log(nameIndex)
    console.log(algorithmsData[nameIndex])
    console.log(typeof algorithmsData[nameIndex].Soundex)
    console.log(typeof algorithmsData[nameIndex].Soundex !== 'undefined')
    // console.log(nameIndex)
    const algorithmsNames = [
        "SpokenName2Vec",
        "Double Metaphone",
        "GRAFT",
        "Match Rating Codex",
        "Metaphone",
        "Nysiis",
        "Soundex"
]
    // const algorithmsNames = Object.keys(algorithmsData[nameIndex])
    console.log(algorithmsNames)
    const query = useSelector((state) => state.reduser.query);
    // console.log(query)
    const queryNames = useSelector((state) => state.reduser.queryNames);

    const handleSelectName = (selectedName) => {
        // console.log("noa")
        setQueryNameValue(selectedName)
        dispatch(editQueryNames(selectedName, numberIndex, nameIndex))
        /////
        getUserQuery()
        // console.log(userQuery)
        // dispatch(setQuery(userQuery))
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
        // <Form>
        <Form.Group as={Row} style={{margin:"0px"}}>
        {/* <Col key={`${name}_${nameIndex}`}> */}
            <Row lg={2} md={2} sm={2} xs={2} className="g-3" >
                <Col style={{margin:"0px"}}>
                    <Form.Control id={`${name}_${numberIndex}`} key={`${name}_${numberIndex}`} defaultValue={queryNameValue} style={{ textAlign: "left", display: "inline", boxSizing: "border-box" }} onChange={(e) => setTimeout(() => {return handleSelectName(e.target.value)}, 1000)} />
                </Col>
                {typeof algorithmsData[nameIndex].Soundex !== 'undefined' && <Col className="g-1" style={{margin:"0px", textAlign:"left"}}>
                    {/* <Dropdown style={{ display: "inline" }}> */}
                    {/* <Dropdown.Toggle className={Styles.sort} variant="icon" bsPrefix="Button" size="xs" id="dropdown-basic"> */}
                    <ListUl as="button" style={{ marginBottom: "0px", cursor: "pointer" }} onClick={() => setShowQueryModal(true)} />
                    {/* </Dropdown.Toggle> */}

                    <Modal show={showQueryModal} onHide={()=>setShowQueryModal(false)}>
                        {/* // animation={false}
                        // keyboard={false}> */}
                        {/* // aria-labelledby="contained-modal-title-vcenter"
// centered> */}
                        {/* backdrop="static" */}
                        <Modal.Header className={Styles.modal_header} closeButton>
                            <Modal.Title>Select name</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className={Styles.accordion_modal}>
                        
                        {/* <Accordion alwaysOpen className={Styles.accordion_modal}> */}
                        <Accordion className={Styles.accordion_modal}>
                            {
                                Array.from({ length: algorithmsNames.length })
                                    .map((_, algorithmIndex) => {
                                        const algorithm = algorithmsNames[algorithmIndex]
                                        const data = algorithmsData[nameIndex][algorithm]
                                        return (
                                            <Accordion.Item eventKey={algorithmIndex} key={algorithm}>
                                                <Accordion.Header className={Styles.accordion_body}><b>{algorithm}</b></Accordion.Header>
                                                <Accordion.Body>
                                                    <ul className={Styles.accordion_item}>
                                                    {/* <Row> */}
                                                    {data.map((name) => {
                                                        return (
                                                            // <Col lg={data.length} md={data.length} sm={data.length}>
                                                            <li className={Styles.accordion_item_name} key={`${algorithm}_${name.candidate}`}
                                                                as='button'
                                                                onClick={() => handleSelectName(name.candidate)}>
                                                                {/* className={Styles.result}> */}
                                                                {name.candidate}
                                                            </li>
                                                            // {/* </Col> */}
                                                        )
                                                    })}
                                                    </ul>
                                                    {/* </Row> */}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        )
                                    })}
                        </Accordion>
                        </Modal.Body>
                        {/* <Modal.Footer>
       <Button variant="secondary" onClick={handleCancel}>
           Close
       </Button>
       <Button variant="success" onClick={handleSave}>
           Save Changes
       </Button>
   </Modal.Footer> */}
                    </Modal>
                </Col>}
            </Row>
        {/* </Col> */}
        </Form.Group>)
        {/* </Form>) */}
}

export default QueryNameInput;
