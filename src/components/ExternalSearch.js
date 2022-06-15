import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { addQueryNames, setQuery } from '../store/action';
import { useDispatch } from "react-redux";
import Styles from '../App.module.scss'
import axios from "axios";
import { Row, Col, Accordion, Form, Card, Container } from 'react-bootstrap'
import SearchEngines from "./SearchEngines"
import QueryNameInput from "./QueryNameInput";


const ExternalSearch = ({ searchedName, suggestions, suggestionsExist, algorithmsData }) => {
    const dispatch = useDispatch()
    const username = useSelector((state) => state.reduser.username);
    const likes = useSelector((state) => state.reduser.likes);
    const query = useSelector((state) => state.reduser.query);
    const queryNames = useSelector((state) => state.reduser.queryNames);
    const defultNumOfNames = 5
    const [tempNumOfQueryNames, setTempNumOfQueryNames] = useState(defultNumOfNames);
    const searchedNameSplit = searchedName.split(" ")

    const handleChangeNum = (newNum) => {
        setTempNumOfQueryNames(newNum)
        getQuery(newNum)
    }

    useEffect(() => {
        dispatch(setQuery(""))
        dispatch(addQueryNames(""))
        if (searchedName && suggestions.length > 0)
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

            <div style={{ display: !username ? 'inline' : 'none', }} className={Styles.container_fluid}>
                <div className={Styles.result_wrapper}>
                    <div className={Styles.result_wrapper}>
                        <Container>
                            <Row className="justify-content-center" style={{ marginTop: "30px", marginBottom: "4px" }}>
                                <Card className="flex-fill mx-auto" style={{ width: "90%" }}><Card.Body style={{ textAlign: "center" }}>
                                    <b>Do you want to use the algorithms' top suggestions to search in popular search engines? <br /><Link to={"/signup"}>CLICK HERE</Link> to sign up </b></Card.Body></Card>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
            <div style={{ display: username ? 'inline' : 'none', }}>



                <Row className={Styles.result_wrapper} style={{ textAlign: "center", marginBottom: "0px", marginTop: "0px" }}>
                    <div>Click the search engines to search for results using the algorithms' top suggestions!</div>
                    <div>The search query consists of the original searched name and the top 4 ranked synonyms,</div>
                    <div>calculated by your rankings, the name's general ranking and its Edit-Distance from the original searched name.</div>
                    <p><b><u>Search query includes the names</u>: <i>{query.replaceAll(' OR', ',').replaceAll('"', '')}</i></b></p>

                </Row>
                <Row style={{ marginTop: '30px' }}>
                    <Accordion alwaysOpen style={{ textAlign: "center" }}>
                        <Accordion.Item eventKey={0}>
                            {/* <Accordion.Header style={{ textAlign: "center" }} className={Styles.accordion_header}> */}
                            <Accordion.Header className={Styles.edit_query_accordion} style={{ margin: "10px", textAlign: "center" }}>
                                <Row>
                                    {/* <p><u>Search query includes the names</u>: <i>{query.replaceAll(' OR', ',').replaceAll('"', '')}</i></p> */}
                                    {/* <div style={{ margin: "10px 10px 10px 210%",}}> */}
                                    <div >
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
            </div>
            <Row style={{ marginTop: '30px' }}>


                <SearchEngines query={query} suggestionsExist={suggestionsExist} />
            </Row>
        </div>
        : <div></div>
};

export default ExternalSearch;
