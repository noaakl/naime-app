import React, { useState } from "react";
import axios from "axios";
import { algorithems } from './AlgorithemsConstants'
import Styles from './App.module.scss'
import SearchCount from './SearchCount'
import RankInfo from './RankInfo'
import {Card} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import { Dropdown } from "react-bootstrap";
import { HandThumbsUpFill, HandThumbsDownFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button'

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
                <h2 className={Styles.result_title}>Suggested Synonyms for the name '{searchedName}':</h2>
                <SearchCount searchedName={searchedName} />

                <Dropdown>
                    <strong>sort by &nbsp;</strong> <Dropdown.Toggle className={Styles.sort} variant="secondary" size="sm" id="dropdown-basic">
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
                {/* </div> */}
            </div>
            <Row md={4} className="g-4" style={{margin:0, padding:0}}>
            {Object.keys(algorithemsData).map((algorithem) => {
                return (
                    <Col key={algorithem} style={{margin:0, padding:0}}>
                    <Card id={algorithem} className="shadow-sm p-3 mb-3 bg-white rounded"
                    style={{height:'300px', margin:5, padding:0}}
                    >
                        <Card.Body style={{margin:0, padding:0}}>
                            <h3 style={{textAlign:"center"}}>{algorithem}</h3>
                        {algorithemsData[algorithem].map((name) => {
                            const showLikeRank = algorithem in algorithems && name?.add_rank !== -1
                            const showDislikeRank = algorithem in algorithems && name?.add_rank !== 1
                            return (
                                <span key={`${algorithem}_${name.candidate}`} className={Styles.result}>{name.candidate}
                                    <RankInfo searchedName={searchedName} candidateName={name} algorithem={algorithem}/>
                                    {/* {showDislikeRank && <RankInfo icon={HandThumbsDownFill} searchedName={searchedName} name={name} algorithem={algorithem} rank={-1}/>} */}
                                    {/* {showDislikeRank && <Button disabled={name.add_rank !== 0} variant="text" className={Styles.rank_button}
                                        onClick={() => { rankResults(name, algorithem, -1) }}><HandThumbsDownFill /></Button>} */}
                                </span>
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