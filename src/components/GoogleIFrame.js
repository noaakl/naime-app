import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Styles from '../App.module.scss'
import axios from "axios";
import { Card, Row, Col } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import IFrame from "./IFrame";


const GoogleIFrame = ({ searchedName, suggestions, suggestionsExist }) => {
    const likes = useSelector((state) => state.reduser.likes);
    const [query, setQuery] = useState("")

    useEffect(() => {
        setQuery("")
        // console.log(searchedName)
        if (searchedName)
            getQuery()
    }, [searchedName, suggestions]);


    // const handleGoogleRes = (key) =>{
    //     // if (googleResults[key]===null || googleResults[key]==="403 Forbidden"){return "Title doesn't exist"} 
    //     if (googleResults[key]===null || googleResults[key]==="403 Forbidden"){return ""} 
    //     return googleResults[key]
    // }
    // const getGoogleResults = () => {
    //     const searchData = {
    //         "name": searchedName,
    //         "suggestions": suggestions,
    //         "userLikes": likes[searchedName] ? likes[searchedName] : []
    //     }
    //     axios.post('/api/googleSearch', searchData)
    //     .then((response) => {
    //         if (response.data.length > 0)
    //             setGoogleResults(response.data[0])
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // }

    const getQuery = () => {
        const searchData = {
            "name": searchedName,
            "suggestions": suggestions,
            "userLikes": likes[searchedName] ? likes[searchedName] : []
        }
        axios.post('/api/googleQuery', searchData)
        .then((response) => {
            const query = response.data['query']
            setQuery(query)
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return suggestionsExist ?
        <div className={Styles.result_wrapper}>
            <div className={Styles.result_wrapper}></div>
                {/* <Row> */}
                <Row >
                        <h2 className={Styles.google_result_title}>Google search results for the name '{searchedName}'</h2>
                </Row>
                <Row>
                <p>Google results using the algorithms suggestions within the query</p>
                </Row>
                <Row>
                    <Col>
                    <IFrame Styles={{}} query={query}/>

                    </Col>
                </Row>

        </div>
        : <div></div>
};

export default GoogleIFrame;
