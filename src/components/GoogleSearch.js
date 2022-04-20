import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Styles from '../App.module.scss'
import axios from "axios";
import { Card, Row, Col } from 'react-bootstrap'
import { Google } from 'react-bootstrap-icons';


const GoogleSearch = ({ searchedName, suggestions, suggestionsExist }) => {
    const likes = useSelector((state) => state.reduser.likes);
    const [googleResults, setGoogleResults] = useState({})
    console.log(searchedName)

    useEffect(() => {
        setGoogleResults([])
        if (searchedName)
            getGoogleResults()
    }, [searchedName, suggestions]);


    const handleGoogleRes = (key) =>{
        if (googleResults[key]==null || googleResults[key]=="403 Forbidden"){return "Title doesn't exist"} 
        return googleResults[key]
    }
    const getGoogleResults = () => {
        const searchData = {
            "name": searchedName,
            "suggestions": suggestions,
            "userLikes": likes[searchedName] ? likes[searchedName] : []
        }
        axios.post('/api/googleSearch', searchData)
        .then((response) => {
            console.log(response)
            setGoogleResults(response.data)
            console.log(googleResults)
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return suggestionsExist ?
        <div className={Styles.result_wrapper}>
            <div className={Styles.result_wrapper}></div>
                <Row>
                
                        <h2 className={Styles.result_title}>Google search results for the name '{searchedName}'</h2>
                        <h2 style={{fontSize:"15px"}}><b>Google results using the algorithem's suggestions within the query</b></h2>
                </Row>
                <Row lg={5} md={3} sm={2} xs={1} className="g-4" style={{ margin: 0, padding: 0 }}>
                {Object.keys(googleResults).map((key,value) => {
                    return (
                        <>
                        <Col style={{justifyContent:"center"}}>
                            <Card style={{minHeight:"200px"}} ><Card.Body>
                            <div key={key}>
                            <a className={Styles.googleResults} href={key} target="_blank">{handleGoogleRes(key)}</a>
                            <p style={{fontSize:"11px"}}>URL: {key}</p>
                            </div>
                            </Card.Body></Card>
                        </Col>
                        </>
                    )
                })}
                </Row>
        </div>
        : <div></div>
};

export default GoogleSearch;