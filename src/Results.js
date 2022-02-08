import React from "react";
import Styles from './App.module.scss'
import SearchCount from './SearchCount'
import {Card} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'

const Results = ({ searchedName, algorithemsData }) => {
    const suggestionsExist = typeof algorithemsData.soundex !== 'undefined'
    return suggestionsExist ?
        <div className={Styles.result_wrapper}>
            <div className={Styles.result_wrapper}>
                <h2 className={Styles.result_title}>Suggested Synonyms for the name '{searchedName}':</h2>
                <SearchCount searchedName={searchedName}/>
            </div>
            <Row md={4} className="g-4" style={{margin:0, padding:0}}>
            {Object.keys(algorithemsData).map((algorithem) => {
                return (
                    <Col style={{margin:0, padding:0}}>
                    <Card  className="shadow-sm p-3 mb-3 bg-white rounded" 
                    style={{height:'300px', margin:5, padding:0}}
                    >
                        <Card.Body style={{margin:0, padding:0}}>
                            <h3 style={{textAlign:"center"}}>{algorithem}</h3>
                        {algorithemsData[algorithem].map((name) => {
                            return (
                                <span>{name.candidate}</span>
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