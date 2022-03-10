import React, { useState, useEffect } from "react";
import Styles from '../App.module.scss'
import SearchCount from './SearchCount'
import RankInfo from './RankInfo'
import { Card, Row, Col, Dropdown } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { SortDown, FunnelFill } from 'react-bootstrap-icons';

const Results = ({ searchedName, algorithemsData }) => {
    const suggestionsExist = typeof algorithemsData.soundex !== 'undefined'
    const algorithemsNames = Object.keys(algorithemsData)
    const [sortValue, setSortValue] = useState("Default A-Z")
    const [isAZData, setAZData] = useState(true)
    const [algorithems, setAlgorithems] = useState([])
    const algorithemMapping = {}

    useEffect(() => {
        setAlgorithems(algorithemsNames)
    }, [algorithemsData]);

    const sortFunc = (a, b) => {
        return isAZData ? a.candidate.localeCompare(b.candidate) : b.user_rank - a.user_rank
    }

    const handleFilterCheck = (value) => {
        const checkedAlgorithems = algorithems.slice()
        if (checkedAlgorithems.includes(value)) {
            const valueIndex = checkedAlgorithems.indexOf(value);
            checkedAlgorithems.splice(valueIndex, 1);
        }
        else {
            const valueIndex = algorithemsNames.indexOf(value);
            checkedAlgorithems.splice(valueIndex, 0, value);
        }
        setAlgorithems(checkedAlgorithems)
    }

    const isChecked = (value) => {
        return algorithems.includes(value)
    }

    Object.keys(algorithemsData).forEach(algorithem => { algorithemsData[algorithem].sort(sortFunc) });

    return suggestionsExist ?
        <div className={Styles.result_wrapper}>
            <div className={Styles.result_wrapper}>
                <Row>
                    <h2 className={Styles.result_title}>Suggested Synonyms for the name '{searchedName}'</h2>
                </Row>
                <Row>
                    <Col style={{ marginTop: -20, marginBottom: 30 }}>
                        <strong>more info</strong><SearchCount searchedName={searchedName} />
                    </Col>
                </Row>
                <Row xs={1} md={1} lg={4}>
                    <Col style={{ margin: 5 }}>
                        <Dropdown>
                            <strong>sort by  </strong><SortDown style={{ marginRight: "15px", marginLeft: "5px" }} /><Dropdown.Toggle className={Styles.sort} variant="secondary" size="sm" id="dropdown-basic">
                                {sortValue}

                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => {
                                        setAZData(false)
                                        setSortValue("User Rank")
                                    }}>
                                    User Rank</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    setAZData(true)
                                    setSortValue("Default A-Z")
                                }}>Default A-Z</Dropdown.Item>
                                {/* <Dropdown.Item onClick={()=>{}}>User Rank</Dropdown.Item> */}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col style={{ margin: 5 }}>
                        <Dropdown>
                            <strong>filter by  </strong><FunnelFill style={{ marginRight: "15px", marginLeft: "5px" }} />
                            <Dropdown.Toggle variant="secondary" size="sm" id="dropdown-basic">
                                {"Type"}

                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Form>
                                    {Object.keys(algorithemsData).map((algorithem) => {
                                        return (
                                            <div className={Styles.filter}>
                                            <Form.Check
                                                label={algorithem}
                                                type="checkbox"
                                                id={algorithem}
                                                name="algorithems"
                                                checked={isChecked(algorithem)}
                                                onChange={() => handleFilterCheck(algorithem)} />
                                                </div>
                                        )
                                    })
                                    }
                                </Form>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                </Row>
            </div>
            <Row lg={4} md={3} sm={2} xs={1} className="g-4" style={{ margin: 0, padding: 0 }}>
                {algorithems.map((algorithem) => {
                    return (
                        <Col key={algorithem} style={{
                            margin: 0, display: "flex",
                            flexWrap: "wrap", padding: 0
                        }}>
                            <Card id={algorithem} className="shadow-sm p-3 mb-3 bg-white rounded"
                                style={{ height: '380px', width: "95%", margin: 5, padding: 0 }}
                            >
                                <Card.Body style={{ margin: 0, padding: 0 }}>
                                    <h3 style={{ textAlign: "center" }}>{algorithem}</h3>
                                    {algorithemsData[algorithem].map((name) => {
                                        // const showLikeRank = algorithem in algorithems && name?.add_rank !== -1
                                        // const showDislikeRank = algorithem in algorithems && name?.add_rank !== 1
                                        return (
                                            <>
                                                <Row>
                                                    <Col className={Styles.resultcol}>
                                                        <div key={`${algorithem}_${name.candidate}`} className={Styles.result}>{name.candidate}
                                                        </div>
                                                    </Col>
                                                    <Col className={Styles.resultcolrank}>
                                                        <RankInfo searchedName={searchedName} name={name} algorithem={algorithem} />
                                                    </Col>
                                                </Row>
                                            </>
                                        )
                                    })}</Card.Body>
                            </Card></Col>)
                })}
            </Row>
        </div>
        : <div className={Styles.result_wrapper}>
            <h2>No Synonyms Suggested</h2>
        </div>
};

export default Results;