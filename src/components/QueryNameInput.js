import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setQuery, editQueryNames } from '../store/action';
import Styles from '../App.module.scss'
import axios from "axios";
import { Row, Col, Modal, Accordion, Form } from 'react-bootstrap'
import { ListUl } from 'react-bootstrap-icons';

const QueryNameInput = ({ name, nameIndex, numberIndex, algorithmsData }) => {
    const dispatch = useDispatch()
    const queryNames = useSelector((state) => state.reduser.queryNames);
    const [showQueryModal, setShowQueryModal] = useState(false)
    const [queryNameValue, setQueryNameValue] = useState(name)
    const [algorithmIndex, setAlgorithmIndex] = useState(null)
    const algorithmsNames = [
        "SpokenName2Vec",
        "Double Metaphone",
        "GRAFT",
        "Match Rating Codex",
        "Metaphone",
        "Nysiis",
        "Soundex"
    ]

    const handleSelectName = (selectedName, index) => {
        setQueryNameValue(selectedName)
        setAlgorithmIndex(index)
        dispatch(editQueryNames(selectedName, numberIndex, nameIndex))
        getUserQuery()
        setShowQueryModal(false)
    }

    const getUserQuery = () => {
        axios.post('/api/userQuery', { queryNames: queryNames })
            .then((response) => {
                const userQuery = response.data['query']
                dispatch(setQuery(userQuery))
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Form.Group as={Row} style={{ margin: "0px" }}>
            <Row lg={2} md={2} sm={2} xs={2} className="g-3" >
                <Col style={{ margin: "0px" }}>
                    <Form.Control id={`${name}_${numberIndex}`} key={`${name}_${numberIndex}`} defaultValue={queryNameValue} style={{ textAlign: "left", display: "inline", boxSizing: "border-box" }} onChange={(e) => setTimeout(() => { return handleSelectName(e.target.value, null) }, 1000)} />
                </Col>
                {typeof algorithmsData[nameIndex].Soundex !== 'undefined' && <Col className="g-1" style={{ margin: "0px", textAlign: "left" }}>
                    <ListUl as="button" style={{ marginBottom: "0px", cursor: "pointer" }} onClick={() => setShowQueryModal(true)} />

                    <Modal show={showQueryModal} onHide={() => setShowQueryModal(false)}>

                        <Modal.Header className={Styles.modal_header} closeButton>
                            <Modal.Title>Select name</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className={Styles.accordion_modal}>

                            <Accordion defaultActiveKey={algorithmIndex} className={Styles.accordion_modal}>
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
                                                            {data.map((name) => {
                                                                return (
                                                                    <li className={queryNameValue == name.candidate ? Styles.accordion_selected_item_name : Styles.accordion_item_name} key={`${algorithm}_${name.candidate}`}
                                                                        as='button'
                                                                        onClick={() => handleSelectName(name.candidate, algorithmIndex)}>
                                                                        {name.candidate}
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            )
                                        })}
                            </Accordion>
                        </Modal.Body>
                    </Modal>
                </Col>}
            </Row>
        </Form.Group>)
}

export default QueryNameInput;
