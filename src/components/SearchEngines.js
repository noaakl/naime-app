import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Styles from '../App.module.scss'
import axios from "axios";
import { Card, Row, Col, Button, Modal, Dropdown, Accordion } from 'react-bootstrap'
// import { Google, Twitter, Linkedin, Youtube, Yahoo } from 'react-bootstrap-icons';
import { Google, Twitter, Linkedin, Youtube, Microsoft, ExclamationLg, ListUl } from 'react-bootstrap-icons';
import { queryAllByAltText } from "@testing-library/react";
// import { Button } from "bootstrap";


const SearchEngines = ({ searchedName, suggestions, suggestionsExist, algorithmsData }) => {
    const likes = useSelector((state) => state.reduser.likes);
    const defultNumOfNames = 5
    const [query, setQuery] = useState("")
    const [numOfQueryNames, setNumOfQueryNames] = useState(defultNumOfNames);
    const [tempNumOfQueryNames, setTempNumOfQueryNames] = useState(defultNumOfNames);
    const [show, setShow] = useState(false);
    const searchedNameSplit = searchedName.split(" ")
    const querySplit = query.replaceAll('"', "").split(" OR ")
    // console.log(querySplit.length)
    // console.log(query)
    const handleSave = () => {
        setNumOfQueryNames(tempNumOfQueryNames)
        setShow(false)
    }
    const handleCancel = () => {
        setTempNumOfQueryNames(defultNumOfNames)
        setShow(false)
    }
    const handleShow = () => setShow(true);

    const handleChangeNum = (newNum) => {
        // console.log(newNum)
        setTempNumOfQueryNames(newNum)
        // console.log(tempNumOfQueryNames)
        getQuery(newNum)
    }

    useEffect(() => {
        setQuery("")
        // console.log(searchedName)
        if (searchedName)
            getQuery(numOfQueryNames)
    }, [searchedName, suggestions, numOfQueryNames]);

    const getQuery = (num) => {
        const searchData = {
            "name": searchedName,
            "suggestions": suggestions,
            "userLikes": likes[searchedName] ? likes[searchedName] : [],
            "numOfQueryNames": num
        }
        axios.post('/api/googleQuery', searchData)
            .then((response) => {
                const query = response.data['query']
                setQuery(query)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return suggestionsExist ?
        <div className={Styles.result_wrapper}>
            <div className={Styles.result_wrapper}></div>
            {/* <Row> */}
            <Row className={Styles.result_wrapper} style={{ margin: "0px" }}>
                <Col className={Styles.result_title} style={{ marginTop: "30px", marginBottom: "0px" }}>
                    <h3>Search Engines Results for the Name <b><i>{searchedName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</i></b></h3>
                </Col>
            </Row>
            <Row className={Styles.result_wrapper} style={{ textAlign: "center", marginBottom: "0px", marginTop: "0px" }}>
                <p>Click a Search Engine to search for results using the algorithms top suggestions!</p>
                <p>Search Query: {query.replaceAll('OR ', '').replaceAll('"', '')}</p>
                <p></p>
            </Row>
            <Row className="align-items-center justify-content-center">
                <Button variant="success" onClick={handleShow} style={{ width: "250px", marginBottom: "30px" }}>
                    Click Here to Change the Query </Button>
            </Row>

            <Modal show={show} onHide={handleCancel} animation={false}
                backdrop="static" keyboard={false}>
                {/* // aria-labelledby="contained-modal-title-vcenter"
            // centered> */}
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Row style={{ marginBottom: "5px" }}>
                        <Col>
                            choose number of names to includes in the query <input type="number" min="1" max="10" value={tempNumOfQueryNames} style={{ textAlign: "center" }} onChange={(e) => { handleChangeNum(e.target.value) }}></input></Col>
                    </Row>
                    {
                        Array.from({ length: querySplit.length })
                            .map((_, numberIndex) => {
                                const nameSplit = querySplit[numberIndex].split(" ")
                                return (
                                    <Row lg={searchedNameSplit.length} md={2} sm={2} xs={1} className="g-4" style={{ marginBottom: "5px" }}>
                                        {
                                            Array.from({ length: nameSplit.length })
                                                .map((__, nameIndex) => {
                                                    const name = nameSplit[nameIndex]
                                                    const algorithmsNames = Object.keys(algorithmsData[nameIndex])
                                                    return (
                                                        <Col style={{ display: "inline" }}>
                                                            <Row lg={2} md={2} sm={2} xs={2} className="g-4">
                                                                <Col className="g-1">
                                                                    <input id={`${name}_${numberIndex}`} key={`${name}_${numberIndex}`} defaultValue={name} style={{ textAlign: "center", display: "inline", boxSizing: "border-box" }} />
                                                                </Col>
                                                                <Col className="g-1">
                                                                    <Dropdown style={{ display: "inline" }}>
                                                                        <Dropdown.Toggle className={Styles.sort} variant="icon" bsPrefix="Button" size="xs" id="dropdown-basic">
                                                                            <ListUl style={{ marginBottom: "20px" }} />
                                                                        </Dropdown.Toggle>

                                                                        <Dropdown.Menu>
                                                                            <Accordion alwaysOpen>
                                                                                {
                                                                                    Array.from({ length: algorithmsNames.length })
                                                                                        .map((_, algorithmIndex) => {
                                                                                            const algorithm = algorithmsNames[algorithmIndex]
                                                                                            const data = algorithmsData[nameIndex][algorithm]
                                                                                            console.log(algorithmsData)
                                                                                            console.log(algorithm)
                                                                                            return (
                                                                                                <Accordion.Item eventKey={algorithmIndex}>
                                                                                                    <Accordion.Header>{algorithm}</Accordion.Header>
                                                                                                    <Accordion.Body>
                                                                                                        {data.map((name) => {
                                                                                                            return (
                                                                                                                <div key={`${algorithm}_${name.candidate}`} className={Styles.result}>{name.candidate}
                                                                                                                </div>
                                                                                                            )
                                                                                                        })}
                                                                                                    </Accordion.Body>
                                                                                                </Accordion.Item>
                                                                                            )
                                                                                        })}
                                                                            </Accordion>
                                                                        </Dropdown.Menu>
                                                                    </Dropdown>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    )
                                                }
                                                )
                                        }
                                    </Row>
                                )
                            }
                            )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* <Container style={{width:"80%"}}> */}
            <Row lg={3} md={3} sm={2} xs={1} className="g-4" style={{ margin: 0, padding: 0 }}>
                {/* <Row lg={3} md={3} sm={2} xs={1} className="g-4" style={{ margin: 0, padding: 0 }}> */}
                <a className={Styles.googleResults} href={`https://www.google.com/search?igu=1&ei=&q=${query}`} target="_blank">
                    <Col className="align-items-center justify-content-center">
                        <Card className="align-items-center justify-content-center" style={{ backgroundColor: "rgb(221, 75, 57)" }} role='button' >
                            <Card.Body>
                                <Google color='white' size={25} /> <small className={Styles.social_media_text}> GOOGLE</small>
                            </Card.Body></Card>
                    </Col>
                </a>
                <a className={Styles.googleResults} href={`https://twitter.com/search?q=${query}&f=user`} target="_blank">
                    <Col className="align-items-center justify-content-center">
                        <Card className="align-items-center justify-content-center" style={{ backgroundColor: "rgb(85, 172, 238)" }} role='button' >
                            <Card.Body>
                                <Twitter color='white' size={25} /> <small className={Styles.social_media_text}> TWITTER</small>
                            </Card.Body></Card>
                    </Col>
                </a>
                <a className={Styles.googleResults} href={`https://www.youtube.com/results?search_query=${query}`} target="_blank">
                    <Col className="align-items-center justify-content-center">
                        <Card className="align-items-center justify-content-center" style={{ backgroundColor: "rgb(237, 48, 47)" }} role='button' >
                            <Card.Body>
                                <Youtube color='white' size={25} /> <small className={Styles.social_media_text}> YOUTUBE</small>
                            </Card.Body></Card>
                    </Col>
                </a>
                <a className={Styles.googleResults} href={`https://www.linkedin.com/search/results/all/?keywords=${query}`} target="_blank">
                    <Col className="align-items-center justify-content-center">
                        <Card className="align-items-center justify-content-center" style={{ backgroundColor: "rgb(0, 130, 202)" }} role='button' >
                            <Card.Body>
                                <Linkedin color='white' size={25} /> <small className={Styles.social_media_text}> LINKEDIN</small>
                            </Card.Body></Card>
                    </Col>
                </a>
                <a className={Styles.googleResults} href={`https://www.bing.com/search?q=${query}`} target="_blank">
                    <Col className="align-items-center justify-content-center">
                        <Card className="align-items-center justify-content-center" style={{ backgroundColor: "rgb(255, 185, 1)" }} role='button' >
                            <Card.Body>
                                <Microsoft color='white' size={25} /> <small className={Styles.social_media_text}> BING</small>
                            </Card.Body></Card>
                    </Col>
                </a>
                <a className={Styles.googleResults} href={`https://search.yahoo.com/search?p=${query}`} target="_blank">
                    <Col className="align-items-center justify-content-center">
                        <Card className="align-items-center justify-content-center" style={{ backgroundColor: "rgb(93, 1, 203)" }} role='button' >
                            <Card.Body>
                                <ExclamationLg color='white' size={25} /> <small className={Styles.social_media_text}>YAHOO</small>
                            </Card.Body></Card>
                    </Col>
                </a>
            </Row>
            {/* </Container> */}

        </div>
        : <div></div>
};

export default SearchEngines;
