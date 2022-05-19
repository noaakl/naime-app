import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addQueryNames, editQueryNames, setQuery } from '../store/action';
import { useDispatch } from "react-redux";
import Styles from '../App.module.scss'
import axios from "axios";
import { Row, Col, Button, Modal, Accordion, Card, Form } from 'react-bootstrap'
import SearchEngines from "./SearchEngines"
import QueryModal from "./QueryModal";
import QueryNameInput from "./QueryNameInput";


const ExternalSearch = ({ searchedName, suggestions, suggestionsExist, algorithmsData }) => {
    const dispatch = useDispatch()
    const likes = useSelector((state) => state.reduser.likes);
    const query = useSelector((state) => state.reduser.query);
    const queryNames = useSelector((state) => state.reduser.queryNames);
    // const queryNames = useSelector((state) => state.reduser.queryNames) || [];
    console.log(query)
    // console.log(queryNames)
    const defultNumOfNames = 5
    // const [query, setQuery] = useState("")
    const [numOfQueryNames, setNumOfQueryNames] = useState(defultNumOfNames);
    const [tempNumOfQueryNames, setTempNumOfQueryNames] = useState(defultNumOfNames);
    const [show, setShow] = useState(false);
    const searchedNameSplit = searchedName.split(" ")
    // const querySplit = query.replaceAll('"', "").split(" OR ")
    // console.log(querySplit.length)
    // console.log(query)


    // const handleSave = () => {
    //     setNumOfQueryNames(tempNumOfQueryNames)
    //     dispatch(editQueryNames())
    //     setShow(false)
    //     const userQuery = getUserQuery()
    //     setQuery(userQuery)
    // }
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
        dispatch(setQuery(""))
        dispatch(addQueryNames(""))
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
        axios.post('/api/query', searchData)
            .then((response) => {
                const query = response.data['query']
                const querySplit = query.replaceAll('"', "").split(" OR ")
                console.log(query)
                dispatch(setQuery(query))
                // const userQuery = getUserQuery()
                dispatch(addQueryNames(querySplit))
                // setQuery(userQuery)
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
                {/* <p>Search Query: {query.replaceAll('OR ', '').replaceAll('"', '')}</p> */}
                <p></p>
            </Row>
<Row className="align-items-center justify-content-center">
            <Accordion alwaysOpen style={{ textAlign:"center",justifyContent:"center"}}>
                <Accordion.Item eventKey={0}>
                    <Accordion.Header style={{textAlign:"center"}}>
                    <Row className="align-items-center justify-content-center" >
                <div color="green" onClick={handleShow} style={{ width: "250px", margin: "10px", textAlign:"center"}}>
                    Click Here to Change the Query </div>
            </Row>
                    </Accordion.Header>
                    <Accordion.Body>
                    <Row style={{ marginBottom: "5px"}}>
                            <Col>
                                choose number of names to includes in the query <input type="number" min="1" max="10" value={tempNumOfQueryNames} style={{ textAlign: "center" }} onChange={(e) => { handleChangeNum(e.target.value) }}></input>
                            </Col>
                        </Row>
                        <Form>

                        {   
                                                    
                            Array.from({ length: queryNames.length })
                                .map((_, numberIndex) => {
                            //         console.log(queryNames);
                            // console.log(numberIndex);
                            // console.log(queryNames[numberIndex])
                                    // const nameSplit = queryNames[numberIndex].split(" ")
                                    const nameSplit = queryNames[numberIndex]
                                    return (
                                        <Form.Group as={Row} controlId="formPlaintextEmail" style={{margin:"0px"}}>
                                        <Row lg={searchedNameSplit.length} md={2} sm={1} xs={1} className="g-4" style={{ margin: "0px" }}>
                                            {
                                                Array.from({ length: nameSplit.length })
                                                    .map((__, nameIndex) => {
                                                        const name = nameSplit[nameIndex]
                                                        return (
                                                            <Col style={{margin:"0px"}}>
                                                            {/* <Form.Control type="password" placeholder="Password" /> */}
                                                         
                                                             <QueryNameInput algorithmsData={algorithmsData} nameIndex={nameIndex} name={name} numberIndex={numberIndex} />
                                                             </Col>
                                                        )
                                                    }
                                                    )
                                            }
                                        </Row>
                                        </Form.Group>
                                    )
                                }
                                )
                        }
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                
                </Row>
                
            <SearchEngines query={query} suggestionsExist={suggestionsExist} />

        </div>
        : <div></div>
};

export default ExternalSearch;
