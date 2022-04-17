import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Styles from '../App.module.scss'
import axios from "axios";
import { Card, Row, Col } from 'react-bootstrap'

const GoogleSearch = ({ searchedName, suggestions, suggestionsExist }) => {
    const likes = useSelector((state) => state.reduser.likes);
    const [googleResults, setGoogleResults] = useState([])
    console.log(searchedName)

    useEffect(() => {
        setGoogleResults([])
        if (searchedName)
            getGoogleResults()
    }, [searchedName, suggestions]);

    const getGoogleResults = () => {
        const searchData = {
            "name": searchedName,
            "suggestions": suggestions,
            "userLikes": likes[searchedName] ? likes[searchedName] : []
        }
        axios.post('/api/googleSearch', searchData)
        .then((response) => {
            setGoogleResults(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return googleResults.length>0 && suggestionsExist ?
        <div className={Styles.result_wrapper}>
            <div className={Styles.result_wrapper}>
                <Row>
                    <Col className={Styles.result_title}>
                    <h2>Google search results for the name '{searchedName}'</h2>
                    </Col>
                </Row>

            </div>
            {/* <Row lg={4} md={3} sm={2} xs={1} className="g-4" style={{ margin: 0, padding: 0 }}> */}
                {googleResults.map((googleResult) => {
                    return (
                        <Row key={`${googleResult}Row`} style={{
                            margin: 0, display: "flex",
                            flexWrap: "wrap", padding: 0
                        }}>
                            <Card key={`${googleResult}card`} id={googleResult} className="shadow-sm p-3 mb-3 bg-white rounded"
                                // style={{ height: '380px', width: "95%", margin: 5, padding: 0 }}
                            >
                                <Card.Body key={`${googleResult}cardbody`} style={{ margin: 0, padding: 0 }}>
                                    <h3 style={{ textAlign: "center" }}>{googleResult}</h3>
                                    </Card.Body>
                            </Card></Row>)
                })}
            {/* </Row> */}
        </div>
        : <div className={Styles.result_wrapper}>
            <h2></h2>
        </div>
};

export default GoogleSearch;