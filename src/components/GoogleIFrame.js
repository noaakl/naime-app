import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Styles from '../App.module.scss'
import axios from "axios";
import { Card, Row, Col, Container } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import IFrame from "./IFrame";


const GoogleIFrame = ({ searchedName, suggestions, suggestionsExist }) => {
    const likes = useSelector((state) => state.reduser.likes);
    const [query, setQuery] = useState("")

    useEffect(() => {
        setQuery("")
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
        axios.post('/api/query', searchData)
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
                <Row className={Styles.result_wrapper} style={{margin:"0px"}}>
                    <Col className={Styles.result_title} style={{marginTop:"30px", marginBottom:"0px"}}>
                        <h3>Google Results for the Name <b><i>{searchedName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</i></b></h3>
                    </Col>
                </Row>
                <Row className={Styles.result_wrapper} style={{textAlign:"center", marginBottom:"30px", marginTop:"0px"}}>
                <p>Google search results using the algorithms suggestions within the query</p>
                </Row>
                <Container style={{width:"80%"}}>
                <Row className="justify-content-center">
                    {/* <Col> */}
                    <IFrame Styles={{}} query={query}/>

                    {/* </Col> */}
                </Row>
                </Container>

        </div>
        : <div></div>
};

export default GoogleIFrame;
