import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import Styles from '../App.module.scss'
import SearchCount from './SearchCount'
import RankInfo from './RankInfo'
import Api from './Api'
import { Card, Row, Col, Dropdown } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { SortDown, FunnelFill } from 'react-bootstrap-icons';

const Results = ({ searchedName, algorithemsData, suggestionsExist }) => {
    // const suggestionsExist = typeof algorithemsData.soundex !== 'undefined'
    const algorithemsNames = Object.keys(algorithemsData)
    const [sortValue, setSortValue] = useState("Default A-Z")
    const [isAZData, setAZData] = useState(true)
    const [algorithems, setAlgorithems] = useState([])
    const rankStates = ["likes","dislikes"]
    const [rankStatesChecked, setRankStatesChecked] = useState(["likes","dislikes"])
    // const algorithemMapping = {}

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

    const handleFilterByRankCheck = (value) => {
        const checkedRank = rankStatesChecked.slice()
        if (checkedRank.includes(value)) {
            const valueIndex = rankStatesChecked.indexOf(value);
            checkedRank.splice(valueIndex, 1);
        }
        else {
            checkedRank.splice(0, 0, value);
        }
        setRankStatesChecked(checkedRank)
    }

    const handleFilterByRankShow = (name, like,dislike,algorithem) => {
        if (algorithem!=="spoken_name_2_vec" && algorithem!=="family_trees")
            return true
        else {
            console.log(name)
            const checkedRank = rankStatesChecked.slice()
            if (checkedRank.includes("likes") && like > 0){return true}
            if (checkedRank.includes("dislikes") && dislike < 0) {return true}
            // if (checkedRank.includes("both") && dislike < 0 && like > 0){return true}
            // if (checkedRank.includes("no rank") && dislike == 0 && like == 0){return true}
        }

        return false
    }

    const isCheckedRank = (value) => {
        return rankStatesChecked.includes(value)
    }

    const isChecked = (value) => {
        return algorithems.includes(value)
    }

    Object.keys(algorithemsData).forEach(algorithem => { algorithemsData[algorithem].sort(sortFunc) });

    return suggestionsExist ?
        <div className={Styles.result_wrapper}>
            <div className={Styles.result_wrapper}>
            <Row style={{marginTop:"50px"}}>
                    <Card><Card.Body style={{textAlign:"center"}}><b>Do you want to rank your results? keep track on your searchs? <br/><Link to={"/signup"}>CLICK HERE</Link> to sign up </b></Card.Body></Card>
                </Row>
                <Row>
                    <Col className={Styles.result_title}>
                    <h2>Suggested Synonyms for the name '{searchedName}'</h2>
                    {/* <Col > */}
                    <Api name={searchedName}/>
                    {/* </Col> */}
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginTop: -20}}>
                        <strong>more info</strong><SearchCount searchedName={searchedName} />
                    </Col>
                </Row>
                {/* <Row style ={{marginTop:"15px"}}>
                    <Card><Card.Body style={{textAlign:"center"}}>Search in google </Card.Body></Card>
                </Row> */}
                <Row className={Styles.dropdowns} xs={1} md={1} lg={4}>
                    <Col className={Styles.dropdownsCol}>
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

                    <Col style={{width:"500px"}} className={Styles.dropdownsCol}>
                        <Dropdown style={{display:"inline", margin:"5px"}}>
                            <strong>Filter by </strong><FunnelFill style={{ marginRight: "15px", marginLeft: "5px" }} />
                            <Dropdown.Toggle variant="secondary" size="sm" id="dropdown-basic">
                                {"Algorithem"}

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
                        <Dropdown style={{display:"inline"}}>
                            <Dropdown.Toggle variant="secondary" size="sm" id="dropdown-basic">
                                {"Rank"}

                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Form>
                                    {rankStates.map((rankOption) => {
                                        return (
                                            <div className={Styles.filter}>
                                            <Form.Check
                                                label={rankOption}
                                                type="checkbox"
                                                id={rankOption}
                                                name="algorithems"
                                                checked={isCheckedRank(rankOption)}
                                                onChange={() => handleFilterByRankCheck(rankOption)} />
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
                        <Col key={`${algorithem}col`} style={{
                            margin: 0, display: "flex",
                            flexWrap: "wrap", padding: 0
                        }}>
                            <Card key={`${algorithem}card`} id={algorithem} className="shadow-sm p-3 mb-3 bg-white rounded"
                                style={{ height: '380px', width: "95%", margin: 5, padding: 0 }}
                            >
                                <Card.Body key={`${algorithem}cardbody`} style={{ margin: 0, padding: 0 }}>
                                    <h3 style={{ textAlign: "center" }}>{algorithem}</h3>
                                    {algorithemsData[algorithem].map((name) => {
                                        // const showLikeRank = algorithem in algorithems && name?.add_rank !== -1
                                        // const showDislikeRank = algorithem in algorithems && name?.add_rank !== 1
                                        return (
                                            <>
                                                {handleFilterByRankShow(name,name.like,name.dislike, algorithem) && <Row key={name} >
                                                    <Col key={`${name}_col`} className={Styles.resultcol}>
                                                        <div key={`${algorithem}_${name.candidate}`} className={Styles.result}>{name.candidate}
                                                        </div>
                                                    </Col>
                                                    <Col key={`${name}_rank`} className={Styles.resultcolrank}>
                                                        <RankInfo searchedName={searchedName} name={name} algorithem={algorithem} />
                                                    </Col>
                                                </Row>
                                    }
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