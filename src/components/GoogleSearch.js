import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Styles from '../App.module.scss'
import axios from "axios";
import { Card, Row, Col } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'


const GoogleSearch = ({ searchedName, suggestions, suggestionsExist }) => {
    const likes = useSelector((state) => state.reduser.likes);
    const [googleResults, setGoogleResults] = useState([])
    // console.log(googleResults)
    console.log(searchedName)

    useEffect(() => {
        setGoogleResults([])
        if (searchedName)
            getGoogleResults()
    }, [searchedName, suggestions]);


    const handleGoogleRes = (key) =>{
        // if (googleResults[key]===null || googleResults[key]==="403 Forbidden"){return "Title doesn't exist"} 
        if (googleResults[key]===null || googleResults[key]==="403 Forbidden"){return ""} 
        return googleResults[key]
    }
    const getGoogleResults = () => {
        if (suggestionsExist) {
            const searchData = {
                "name": searchedName,
                "suggestions": suggestions,
                "userLikes": likes[searchedName] ? likes[searchedName] : []
            }
            axios.post('/api/googleSearch', searchData)
            .then((response) => {
                if (response.data.length > 0)
                    setGoogleResults(response.data[0])
                    console.log('here')
            })
            .catch(function (error) {
              console.log(error);
            });
        }
    }

    return suggestionsExist ?
        <div className={Styles.result_wrapper}>
            <div className={Styles.result_wrapper}></div>
                <Row>
                    <Col className={Styles.result_title}>
                        <h2>Google search results for the name '{searchedName}'</h2>
                        </Col>
                </Row>
                <Row>
                <p>Google results using the algorithms suggestions within the query</p>
                </Row>
                {googleResults.length === 0 &&
                    <span className={Styles.spinner}><Spinner
                    // as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> Loading...</span>}
                <Row lg={5} md={3} sm={2} xs={1} className="g-4" style={{ margin: 0, padding: 0 }}>
                {Object.keys(googleResults).map((key, _) => {
                    return (
                        <>
                        <a className={Styles.googleResults} href={key} target="_blank">
                        <Col key={key} target="_blank" style={{justifyContent:"center"}}>
                            <Card style={{minHeight:"200px"}} ><Card.Body>
                            <div key={key}>
                            <h3 className={Styles.googleResults}>{handleGoogleRes(key)}</h3>
                            {/* <p style={{fontSize:"11px"}}>URL: {key}</p> */}
                            <p className={Styles.url}>URL:<br/> {key}</p>
                            </div>
                            </Card.Body></Card>
                        </Col>
                        </a>
                        </>
                    )
                })}
                </Row>
        </div>
        : <div></div>
};

export default GoogleSearch;