import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addQueryNames, setQuery } from '../store/action';
import { useDispatch } from "react-redux";
import Styles from '../App.module.scss'
import axios from "axios";
import { Row, Col, Accordion, Form } from 'react-bootstrap'
import SearchEngines from "./SearchEngines"
import QueryNameInput from "./QueryNameInput";


const ExternalSearch = ({ searchedName, suggestions, suggestionsExist, algorithmsData }) => {
    const dispatch = useDispatch()
    const likes = useSelector((state) => state.reduser.likes);
    const query = useSelector((state) => state.reduser.query);
    const queryNames = useSelector((state) => state.reduser.queryNames);
    const defultNumOfNames = 5
    // const [numOfQueryNames, setNumOfQueryNames] = useState(defultNumOfNames);
    const [tempNumOfQueryNames, setTempNumOfQueryNames] = useState(defultNumOfNames);
    // const [show, setShow] = useState(false);
    const searchedNameSplit = searchedName.split(" ")


    // const handleSave = () => {
    //     setNumOfQueryNames(tempNumOfQueryNames)
    //     dispatch(editQueryNames())
    //     setShow(false)
    //     const userQuery = getUserQuery()
    //     setQuery(userQuery)
    // }
    // const handleCancel = () => {
    //     setTempNumOfQueryNames(defultNumOfNames)
    //     setShow(false)
    // }
    // const handleShow = () => setShow(true);

    const handleChangeNum = (newNum) => {
        setTempNumOfQueryNames(newNum)
        getQuery(newNum)
    }

    useEffect(() => {
        dispatch(setQuery(""))
        dispatch(addQueryNames(""))
        if (searchedName)
            getQuery(defultNumOfNames)
    }, [searchedName, suggestions, defultNumOfNames]);

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
                dispatch(setQuery(query))
                dispatch(addQueryNames(querySplit))
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return suggestionsExist ?
        <div className={Styles.result_wrapper}>
            <Row className={Styles.result_wrapper} style={{ margin: "0px" }}>
                <Col className={Styles.result_title} style={{ marginTop: "30px", marginBottom: "0px" }}>
                    <h3>Search Engines Results for the Name <b><i>{searchedName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</i></b></h3>
                </Col>
            </Row>
            <Row className={Styles.result_wrapper} style={{ textAlign: "center", marginBottom: "0px", marginTop: "0px" }}>
                <p><b>Click the Search Engines to search for results using the algorithms' top suggestions!</b></p>
            </Row>
            <Row>
                <Accordion alwaysOpen style={{ textAlign: "center", justifyContent: "center" }}>
                    <Accordion.Item eventKey={0}>
                        {/* <Accordion.Header style={{ textAlign: "center" }} className={Styles.accordion_header}> */}
                        <Accordion.Header style={{ textAlign: "center" }} className={Styles.edit_query_accordion}>
                            <Row className={Styles.edit_query_accordion} style={{ textAlign: "center", marginBottom: "0px", marginTop: "0px" }}>
                                <p><u>Search query includes the names</u>: <i>{query.replaceAll(' OR', ',').replaceAll('"', '')}</i></p>
                                <div style={{ margin: "10px", textAlign: "center" }}>
                                    <b>Click Here to Change the Query </b></div>
                            </Row>
                        </Accordion.Header>
                        <Accordion.Body className={Styles.accordion_body}>
                            <div className={Styles.query_name_count}>
                                <span className={Styles.query_name_count_text}>
                                    Choose number of names to include in the query
                                </span>
                                <Form.Control type="number" min="2" max="10" size="sm" value={tempNumOfQueryNames} style={{ width: "50px", textAlign: "center" }} onChange={(e) => { handleChangeNum(e.target.value) }}></Form.Control>
                            </div>
                            <Form>

                                {

                                    Array.from({ length: queryNames.length })
                                        .map((_, numberIndex) => {
                                            const nameSplit = queryNames[numberIndex]
                                            return (
                                                <Form.Group key={numberIndex} as={Row} style={searchedNameSplit && searchedNameSplit.length === 1 ? {} : { marginLeft: "17%" }}>
                                                    <Row lg={searchedNameSplit.length} md={searchedNameSplit.length} sm={searchedNameSplit.length} xs={searchedNameSplit.length} className="g-4" style={{ margin: "0px" }}>
                                                        {
                                                            Array.from({ length: nameSplit.length })
                                                                .map((__, nameIndex) => {
                                                                    const name = nameSplit[nameIndex]
                                                                    return (
                                                                        <Col key={nameIndex} style={{ margin: "0px" }}>

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
            <Row style={{ marginTop: '80px' }}>


                <SearchEngines query={query} suggestionsExist={suggestionsExist} />
            </Row>

        </div>
        : <div></div>
};

export default ExternalSearch;
