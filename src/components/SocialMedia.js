import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Styles from '../App.module.scss'
import axios from "axios";
import { Card, Row, Col } from 'react-bootstrap'
import { Google, Twitter, Linkedin, Youtube } from 'react-bootstrap-icons';
// import { Button } from "bootstrap";


const SocialMedia = ({ searchedName, suggestions, suggestionsExist }) => {
    const likes = useSelector((state) => state.reduser.likes);
    const [query, setQuery] = useState("")

    useEffect(() => {
        setQuery("")
        // console.log(searchedName)
        if (searchedName)
            getQuery()
    }, [searchedName, suggestions]);

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
            <Row className={Styles.result_wrapper} style={{ margin: "0px" }}>
                <Col className={Styles.result_title} style={{ marginTop: "30px", marginBottom: "0px" }}>
                    <h3>Search Engines Results for the Name <b><i>{searchedName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</i></b></h3>
                </Col>
            </Row>
            <Row className={Styles.result_wrapper} style={{ textAlign: "center", marginBottom: "30px", marginTop: "0px" }}>
                <p>Search Engines search results using the algorithms suggestions within the query</p>
            </Row>
            {/* <Container style={{width:"80%"}}> */}
            <Row lg={4} md={3} sm={2} xs={1} className="g-4" style={{ margin: 0, padding: 0 }}>
            {/* <Row lg={3} md={3} sm={2} xs={1} className="g-4" style={{ margin: 0, padding: 0 }}> */}
            <a className={Styles.googleResults} href={`https://www.google.com/search?igu=1&ei=&q=${query}`} target="_blank">
                <Col className="align-items-center justify-content-center">
                    <Card className="align-items-center justify-content-center" style={{backgroundColor: "rgb(221, 75, 57)"}} role='button' >
                        <Card.Body>
                            <Google color='white' size={25}/> <small className={Styles.social_media_text}> GOOGLE</small>
                    </Card.Body></Card>
                </Col>
                </a>
                <a className={Styles.googleResults} href={`https://twitter.com/search?q=${query}`} target="_blank">
                <Col className="align-items-center justify-content-center">
                    <Card className="align-items-center justify-content-center" style={{backgroundColor: "rgb(85, 172, 238)"}} role='button' >
                        <Card.Body>
                            <Twitter color='white' size={25}/> <small className={Styles.social_media_text}> TWEETER</small>
                    </Card.Body></Card>
                </Col>
                </a>
                <a className={Styles.googleResults} href={`https://www.linkedin.com/search/results/all/?keywords=${query}`} target="_blank">
                <Col className="align-items-center justify-content-center">
                    <Card className="align-items-center justify-content-center" style={{backgroundColor: "rgb(0, 130, 202)"}} role='button' >
                        <Card.Body>
                            <Linkedin color='white' size={25}/> <small className={Styles.social_media_text}> LINKEDIN</small>
                    </Card.Body></Card>
                </Col>
                </a>
                <a className={Styles.googleResults} href={`https://www.youtube.com/results?search_query=${query}`} target="_blank">
                <Col className="align-items-center justify-content-center">
                    <Card className="align-items-center justify-content-center" style={{backgroundColor: "rgb(237, 48, 47)"}} role='button' >
                        <Card.Body>
                            <Youtube color='white' size={25}/> <small className={Styles.social_media_text}> YOUTUBE</small>
                    </Card.Body></Card>
                </Col>
                </a>
            </Row>
            {/* </Container> */}

        </div>
        : <div></div>
};

export default SocialMedia;
