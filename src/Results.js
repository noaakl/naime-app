import React, { useState } from "react";
import axios from "axios";
import { algorithems } from './AlgorithemsConstants'
import Styles from './App.module.scss'
import SearchCount from './SearchCount'
import {Card} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import { Dropdown } from "react-bootstrap";
import { HandThumbsUpFill, HandThumbsDownFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button'

const Results = ({ searchedName, algorithemsData }) => {
    const suggestionsExist = typeof algorithemsData.soundex !== 'undefined'
    const [likedRanks, setLikedRanks] = useState([])
    const [dislikedRanks, setDislikedRanks] = useState([])
    const [sortValue, setSortValue] = useState("Default A-Z")
    const [isAZData, setAZData] = useState(true)

    const sortFunc = (a, b) => {
        return isAZData ? a.candidate.localeCompare(b.candidate) : b.user_rank - a.user_rank
    }

    Object.keys(algorithemsData).forEach(algorithem => { algorithemsData[algorithem].sort(sortFunc) });

    const rankResults = (name, algorithem, rank) => {
        name.add_rank = rank
        rank > 0 ? setLikedRanks([name].concat(likedRanks)) : setDislikedRanks([name].concat(dislikedRanks))
        if (algorithem in algorithems) {
            const rankData = {
                type_name: algorithem,
                selected_name: searchedName,
                add_rank: name.add_rank,
                candidate: name.candidate,
                distance: name.distance,
                edit_distance: name.edit_distance,
                language: name.language,
                rank: name.rank,
                user_rank: name.user_rank
            }
            axios.put('/rankResults', rankData).catch(function (error) {
                console.log(error);
            });
        }
    }

    return suggestionsExist ?
        <div className={Styles.result_wrapper}>
            <div className={Styles.result_wrapper}>
                <h2 className={Styles.result_title}>Suggested Synonyms for the name '{searchedName}':</h2>
                <SearchCount searchedName={searchedName} />
                {/* <svg className={Styles.info_icon} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48" >
                    <path fill="#F27054" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M22 22h4v11h-4V22zM26.5 16.5c0 1.379-1.121 2.5-2.5 2.5s-2.5-1.121-2.5-2.5S22.621 14 24 14 26.5 15.121 26.5 16.5z"></path>
                </svg> */}
                {/* <div > */}

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
                                    {showLikeRank && <Button disabled={name.add_rank !== 0} variant="text" className={Styles.rank_button}
                                        onClick={() => { rankResults(name, algorithem, 1) }}><HandThumbsUpFill /></Button>}
                                    {showDislikeRank && <Button disabled={name.add_rank !== 0} variant="text" className={Styles.rank_button}
                                        onClick={() => { rankResults(name, algorithem, -1) }}><HandThumbsDownFill /></Button>}
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