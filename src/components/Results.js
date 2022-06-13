import React, { useState, useEffect } from "react";
import Styles from '../App.module.scss'
import SearchCount from './SearchCount'
import RankInfo from './RankInfo'
import Api from './Api'
import { Card, Row, Col, Dropdown } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { SortDown, FunnelFill } from 'react-bootstrap-icons';

const Results = ({ searchedName, algorithmsData, ranks }) => {
    const algorithmsNames = Object.keys(algorithmsData)
    const [rank, setRank] = useState(ranks)
    const [sortValue, setSortValue] = useState("Default A-Z")
    const [algorithms, setAlgorithms] = useState([])
    const rankStates = ["likes","dislikes","no rank"]
    const [rankStatesChecked, setRankStatesChecked] = useState(["likes","dislikes","no rank"])

    useEffect(() => {
        setAlgorithms(algorithmsNames)
        setRank(ranks)
    }, [algorithmsData, ranks]);

    const sortFunc = (a, b) => {
        return sortValue == "Default A-Z" ? a.candidate.localeCompare(b.candidate) : calculateRank(b.candidate) - calculateRank(a.candidate)
    }

    const calculateRank = (candidate) => {
        return handleLikeCount(candidate) - handledisLikeCount(candidate)
    }

    const handleLikeCount = (name) => {
        if ("likes" in rank && name in rank["likes"])
            return rank["likes"][name]
        return 0
    }

    const handledisLikeCount = (name) => {
        if ("dislikes" in rank && name in rank["dislikes"]){
            return rank["dislikes"][name]}
        return 0
    }

    const handleFilterCheck = (value) => {
        const checkedAlgorithms = algorithms.slice()
        if (checkedAlgorithms.includes(value)) {
            const valueIndex = checkedAlgorithms.indexOf(value);
            checkedAlgorithms.splice(valueIndex, 1);
        }
        else {
            const valueIndex = algorithmsNames.indexOf(value);
            checkedAlgorithms.splice(valueIndex, 0, value);
        }
        setAlgorithms(checkedAlgorithms)
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

    const handleAddLike = (rankType, candidate) => {
        let copyOfObject = { ...rank }
        if (rankType === 1){
            if ("likes" in rank && candidate in rank["likes"]){
                copyOfObject["likes"][candidate] +=1
                setRank(copyOfObject)
            }
            else {
                copyOfObject["likes"][candidate] =1
                setRank(copyOfObject)

            }
        }
        else if (rankType === -1 ){
            if ("dislikes" in rank && candidate in rank["dislikes"]){
                copyOfObject["dislikes"][candidate] +=1
                setRank(copyOfObject)
            }
            else {
                copyOfObject["dislikes"][candidate] =1
                setRank(copyOfObject)

            }
        }
    }

    const handleremoveLike = (rankType, candidate) => {
        let copyOfObject = { ...rank }
        if (rankType === 1){
            if ("likes" in rank && rank['likes'][candidate] > 0){
                copyOfObject["likes"][candidate] -=1
                setRank(copyOfObject)
            }
            else  {
                copyOfObject["likes"][candidate] = 0
                setRank(copyOfObject)

            }
        }
        else if (rankType === -1 ){
            if ("dislikes" in rank && rank['dislikes'][candidate] > 0){
                copyOfObject["dislikes"][candidate] -=1
                setRank(copyOfObject)
            }
            else {
                copyOfObject["dislikes"][candidate] =0
                setRank(copyOfObject)

            }
        }
    }



    const handleFilterByRankShow = (likes, dislikes) => {
        const checkedRank = rankStatesChecked.slice()
        if (checkedRank.includes("likes") && likes > 0) {return true}
        if (checkedRank.includes("dislikes") && dislikes > 0) {return true}
        if (checkedRank.includes("no rank") && dislikes === 0 && likes === 0){ return true}
        return false
    }

    const isCheckedRank = (value) => {
        return rankStatesChecked.includes(value)
    }

    const isChecked = (value) => {
        return algorithms.includes(value)
    }

    Object.keys(algorithmsData).forEach(algorithm => {
        algorithmsData[algorithm].sort(sortFunc) });
    Object.keys(ranks).forEach(rank => { });

    return (
        <div className={Styles.result_wrapper}>
            <div className={Styles.result_wrapper}>
                <Row>
                    <Col className={Styles.result_title}>
                    <h2>Synonyms for <b><i>{searchedName}</i></b></h2>

                    <Api name={searchedName}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SearchCount searchedName={searchedName} />
                    </Col>
                </Row>
                <Row className={Styles.dropdowns} xs={1} md={1} lg={4}>
                    <Col className={Styles.dropdownsCol}>
                        <Dropdown>
                            <strong>Sort by  </strong><SortDown style={{ marginRight: "15px", marginLeft: "5px" }} /><Dropdown.Toggle className={Styles.sort} variant="secondary" size="sm" id="dropdown-basic">
                                {sortValue}

                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item
                                    onClick={() => {
                                        setSortValue("User Rank")
                                    }}>
                                    User Rank</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    setSortValue("Default A-Z")
                                }}>Default A-Z</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col style={{width:"500px"}} className={Styles.dropdownsCol}>
                        <Dropdown style={{display:"inline", margin:"5px"}}>
                            <strong>Filter by </strong><FunnelFill style={{ marginRight: "15px", marginLeft: "5px" }} />
                            <Dropdown.Toggle variant="secondary" size="sm" id="dropdown-basic">
                                {"Algorithm"}

                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Form>
                                    {Object.keys(algorithmsData).map((algorithm) => {
                                        return (
                                            <div key={algorithm} className={Styles.filter}>
                                            <Form.Check
                                                label={algorithm}
                                                type="checkbox"
                                                id={algorithm}
                                                name="algorithms"
                                                checked={isChecked(algorithm)}
                                                onChange={() => handleFilterCheck(algorithm)} />
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
                                            <div key={rankOption} className={Styles.filter}>
                                            <Form.Check
                                                label={rankOption}
                                                type="checkbox"
                                                id={rankOption}
                                                name="algorithms"
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
                {algorithms.map((algorithm) => {
                    return (
                        <Col key={`${algorithm}col`} style={{
                            margin: 0, display: "flex",
                            flexWrap: "wrap", padding: 0
                        }}>
                            <Card key={`${algorithm}card`} id={algorithm} className="shadow-sm p-3 mb-3 bg-white rounded"
                                style={{ minHeight: '380px', width: "95%", margin: 5, padding: 0 }}
                            >
                                <Card.Body key={`${algorithm}cardbody`} style={{ margin: 0, padding: 0 }}>
                                    <h3 style={{ textAlign: "center" }}>{algorithm}</h3>
                                    {algorithmsData[algorithm] && algorithmsData[algorithm].map((name) => {
                                        return (
                                            <div key={`${algorithm}_${name.candidate}`}>
                                                {handleFilterByRankShow(handleLikeCount(name.candidate), handledisLikeCount(name.candidate), algorithm) && <Row key={name} >
                                                    <Col key={`${name.candidate}_col`} className={Styles.resultcol}>
                                                        <div key={`${algorithm}_${name.candidate}`} className={Styles.result}>{name.candidate}
                                                        </div>
                                                    </Col>
                                                    <Col key={`${name.candidate}_rank`} className={Styles.resultcolrank}>
                                                        <RankInfo searchedName={searchedName} name={name} algorithm={algorithm} rankLikes={handleLikeCount(name.candidate)} rankDislikes={handledisLikeCount(name.candidate)} handleAddLike={handleAddLike} handleremoveLike={handleremoveLike} />
                                                    </Col>
                                                </Row>
                                    }
                                            </div>
                                        )
                                    })}</Card.Body>
                            </Card></Col>)
                })}
            </Row>
        </div>)
};

export default Results;