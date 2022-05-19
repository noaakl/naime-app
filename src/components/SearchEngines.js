import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Styles from '../App.module.scss'
import axios from "axios";
import { Card, Row, Col, Button, Modal, Dropdown, Accordion } from 'react-bootstrap'
// import { Google, Twitter, Linkedin, Youtube, Yahoo } from 'react-bootstrap-icons';
import { Google, Twitter, Linkedin, Youtube, Microsoft, ExclamationLg, ListUl } from 'react-bootstrap-icons';
import { queryAllByAltText } from "@testing-library/react";
// import { Button } from "bootstrap";


const SearchEngines = ({ query, suggestionsExist }) => {

    return suggestionsExist ?
        <div className={Styles.result_wrapper}>
            {/* <Container style={{width:"80%"}}> */}
            <Row lg={3} md={3} sm={2} xs={1} className="g-4" style={{ margin: 0, padding: 0 }}>
                {/* <Row lg={3} md={3} sm={2} xs={1} className="g-4" style={{ margin: 0, padding: 0 }}> */}
                <a className={Styles.googleResults} href={`https://www.google.com/search?igu=1&ei=&q=${query}`} target="_blank">
                    <Col className="align-items-center justify-content-center">
                        <Card className="align-items-center justify-content-center" style={{ backgroundColor: "rgb(221, 75, 57)" }} role='button' >
                            <Card.Body>
                                <Google color='white' size={25} /> <small className={Styles.social_media_text}> GOOGLE</small>
                            </Card.Body></Card>
                    </Col>
                </a>
                <a className={Styles.googleResults} href={`https://twitter.com/search?q=${query}&f=user`} target="_blank">
                    <Col className="align-items-center justify-content-center">
                        <Card className="align-items-center justify-content-center" style={{ backgroundColor: "rgb(85, 172, 238)" }} role='button' >
                            <Card.Body>
                                <Twitter color='white' size={25} /> <small className={Styles.social_media_text}> TWITTER</small>
                            </Card.Body></Card>
                    </Col>
                </a>
                <a className={Styles.googleResults} href={`https://www.youtube.com/results?search_query=${query}`} target="_blank">
                    <Col className="align-items-center justify-content-center">
                        <Card className="align-items-center justify-content-center" style={{ backgroundColor: "rgb(237, 48, 47)" }} role='button' >
                            <Card.Body>
                                <Youtube color='white' size={25} /> <small className={Styles.social_media_text}> YOUTUBE</small>
                            </Card.Body></Card>
                    </Col>
                </a>
                <a className={Styles.googleResults} href={`https://www.linkedin.com/search/results/all/?keywords=${query}`} target="_blank">
                    <Col className="align-items-center justify-content-center">
                        <Card className="align-items-center justify-content-center" style={{ backgroundColor: "rgb(0, 130, 202)" }} role='button' >
                            <Card.Body>
                                <Linkedin color='white' size={25} /> <small className={Styles.social_media_text}> LINKEDIN</small>
                            </Card.Body></Card>
                    </Col>
                </a>
                <a className={Styles.googleResults} href={`https://www.bing.com/search?q=${query}`} target="_blank">
                    <Col className="align-items-center justify-content-center">
                        <Card className="align-items-center justify-content-center" style={{ backgroundColor: "rgb(255, 185, 1)" }} role='button' >
                            <Card.Body>
                                <Microsoft color='white' size={25} /> <small className={Styles.social_media_text}> BING</small>
                            </Card.Body></Card>
                    </Col>
                </a>
                <a className={Styles.googleResults} href={`https://search.yahoo.com/search?p=${query}`} target="_blank">
                    <Col className="align-items-center justify-content-center">
                        <Card className="align-items-center justify-content-center" style={{ backgroundColor: "rgb(93, 1, 203)" }} role='button' >
                            <Card.Body>
                                <ExclamationLg color='white' size={25} /> <small className={Styles.social_media_text}>YAHOO</small>
                            </Card.Body></Card>
                    </Col>
                </a>
            </Row>
            {/* </Container> */}

        </div>
        : <div></div>
};

export default SearchEngines;
