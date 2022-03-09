import React, { useState } from "react";
import Styles from '../App.module.scss'
import SearchCount from './SearchCount'
import RankInfo from './RankInfo'
import {Card} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import { Dropdown } from "react-bootstrap";
import { SortDown, FunnelFill } from 'react-bootstrap-icons';

const Results = ({ searchedName, algorithemsData }) => {
    const suggestionsExist = typeof algorithemsData.soundex !== 'undefined'
    // const [likedRanks, setLikedRanks] = useState([])
    // const [dislikedRanks, setDislikedRanks] = useState([])
    const [sortValue, setSortValue] = useState("Default A-Z")
    const [isAZData, setAZData] = useState(true)

    const sortFunc = (a, b) => {
        return isAZData ? a.candidate.localeCompare(b.candidate) : b.user_rank - a.user_rank
    }

    Object.keys(algorithemsData).forEach(algorithem => { algorithemsData[algorithem].sort(sortFunc) });

    return suggestionsExist ?
        <div className={Styles.result_wrapper}>
            <div className={Styles.result_wrapper}>
                <Row>
                <h2 className={Styles.result_title}>Suggested Synonyms for the name '{searchedName}'</h2>
                </Row>
                <Row>
                <Col style={{marginTop:-20, marginBottom:30}}>
                <strong>more info</strong><SearchCount searchedName={searchedName} />
                </Col>
                </Row>
                <Row xs={1} md={1} lg={4}>
                    <Col style={{margin:5}}>
                <Dropdown>
                    <strong>sort by  </strong><SortDown style={{marginRight:"15px", marginLeft:"5px"}}/><Dropdown.Toggle className={Styles.sort} variant="secondary" size="sm" id="dropdown-basic">
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

                {/* <Col style={{marginTop:5, marginLeft:-270}}> */}
                <Col style={{margin:5}}>
                <Dropdown>
                   <strong>filter by  </strong><FunnelFill style={{ marginRight:"15px", marginLeft:"5px" }}/>
                   <Dropdown.Toggle className={Styles.sort} variant="secondary" size="sm" id="dropdown-basic">
                       {sortValue}

                   </Dropdown.Toggle>

                   <Dropdown.Menu>
                       <Dropdown.Item bsPrefix="input"
                           onClick={() => {
                               setAZData(false)
                               setSortValue("User Rank")
                           }}>
                           User Rank</Dropdown.Item>
                       <Dropdown.Item type="radio" onClick={() => {
                           setAZData(true)
                           setSortValue("Default A-Z")
                       }}>Default A-Z</Dropdown.Item>
                   </Dropdown.Menu>
                </Dropdown>
                </Col>

                <Col style={{margin:5}}>
                <strong>more info</strong><SearchCount searchedName={searchedName} />
                </Col>
                </Row>
                {/* </div> */}
            </div>
            <Row lg={4} md={3} sm={2} xs={1} className="g-4" style={{margin:0, padding:0}}>
            {Object.keys(algorithemsData).map((algorithem) => {
                return (
                    <Col key={algorithem} style={{margin:0, display: "flex",
                        flexWrap: "wrap", padding:0}}>
                    <Card id={algorithem} className="shadow-sm p-3 mb-3 bg-white rounded"
                    style={{height:'380px', width:"95%", margin:5, padding:0}}
                    >
                        <Card.Body style={{margin:0, padding:0}}>
                            <h3 style={{textAlign:"center"}}>{algorithem}</h3>
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
                                 <RankInfo searchedName={searchedName} name={name} algorithem={algorithem}/>
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