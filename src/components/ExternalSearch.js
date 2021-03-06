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
    const defultNumOfNames = 4
    const [tempNumOfQueryNames, setTempNumOfQueryNames] = useState(defultNumOfNames);
    const [fullQueryNames, setFullQueryNames] = useState([]);
    const searchedNameSplit = searchedName.split(" ")

    const handleChangeNum = (newNum) => {
        const oldNum = tempNumOfQueryNames
        setTempNumOfQueryNames(newNum)
        let names = []
        if (oldNum < newNum) {
            names = queryNames.concat(fullQueryNames.slice(oldNum, newNum))
        }
        else {
            names = queryNames.slice(0, newNum)
        }
        updateQuery(names)
    }

    useEffect(() => {
        dispatch(setQuery(""))
        dispatch(addQueryNames(""))
        if (searchedName && suggestions.length > 0)
            getQuery(defultNumOfNames)
    }, [searchedName, suggestions]);

    const getQuery = (num) => {
        const name = searchedName.charAt(0).toUpperCase() + searchedName.slice(1)
        const searchData = {
            "name": name,
            "suggestions": suggestions,
            "userLikes": likes[name] ? likes[name] : [],
            "numOfQueryNames": num
        }
        axios.post('/api/query', searchData)
            .then((response) => {
                const query = response.data['query']
                const querySplit = query.replaceAll('"', "").split(" OR ")
                const fullquery = response.data['full_query']
                const fullQuerySplit = fullquery.replaceAll('"', "").split(" OR ")
                const transformedNames = fullQuerySplit.map((name) => {return name.split(" ")})
                setFullQueryNames(transformedNames)
                dispatch(setQuery(query))
                dispatch(addQueryNames(querySplit))
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const updateQuery = (names) => {
        axios.post('/api/userQuery', { queryNames: names })
            .then((response) => {
                const userQuery = response.data['query']
                dispatch(setQuery(userQuery))
                const querySplit = userQuery.replaceAll('"', "").split(" OR ")
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
                <Row style={{ marginTop: '30px' }} >
                    <Accordion alwaysOpen className={Styles.edit_query_accordion}>
                        <Accordion.Item eventKey={0}>
                            <Accordion.Header style={{display: 'inline-block', margin: "10px", textAlign: "center" }}>
                                <Row>
                                    <div >
                                        <b>Click Here to Change the Query </b></div>
                                </Row>
                            </Accordion.Header>
                            <Accordion.Body className={Styles.accordion_body}>
                                <Row className={Styles.query_name_count_wrapper}>
                                <div className={Styles.query_name_count}>
                                    <div className={Styles.query_name_count_text}>
                                        Choose number of names to include in the query
                                    </div>
                                    <Form.Control type="number" min="2" max="10" size="sm" value={tempNumOfQueryNames} className={Styles.query_name_count_form_control} style={{width: '50px'}} onChange={(e) => { handleChangeNum(Number(e.target.value)) }}></Form.Control>
                                </div>
                                </Row>
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

                                                                                <QueryNameInput algorithmsData={algorithmsData} nameIndex={nameIndex} nameSplit={nameSplit} numberIndex={numberIndex} />
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
