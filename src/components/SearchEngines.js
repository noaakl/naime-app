import React from "react";
import { useSelector } from "react-redux";
import Styles from '../App.module.scss'
import { Card, Row, Col } from 'react-bootstrap'
import { Google, Twitter, Linkedin, Youtube, Microsoft, ExclamationLg } from 'react-bootstrap-icons';


const SearchEngines = ({ query, suggestionsExist }) => {

    const username = useSelector((state) => state.reduser.username);

    return suggestionsExist ?
        <div className={Styles.result_wrapper}>
            {/* <Container style={{width:"80%"}}> */}
            <Row lg={3} md={3} sm={2} xs={1} className="g-4" style={{ margin: 0, padding: 0 }}>
                {/* <Row lg={3} md={3} sm={2} xs={1} className="g-4" style={{ margin: 0, padding: 0 }}> */}
                <a className={`${Styles.googleResults} ${!username? Styles.disable : ''}`} href={`https://www.google.com/search?igu=1&ei=&q=${query}`} rel="noreferrer" target="_blank">
                    <Col className="align-items-center justify-content-center">
                        <Card className="align-items-center justify-content-center" style={username? { backgroundColor: "rgba(221, 76, 57)" } : { backgroundColor: "rgba(221, 76, 57, 0.509)" }} role='button' >
                            <Card.Body>
                                <Google color='white' size={25} /> <small className={Styles.social_media_text}> GOOGLE</small>
                            </Card.Body></Card>
                    </Col>
                </a>
                <a className={`${Styles.googleResults} ${!username? Styles.disable : ''}`} href={`https://twitter.com/search?q=${query}&f=user`} rel="noreferrer" target="_blank">
                    <Col className="align-items-center justify-content-center">
                        <Card className="align-items-center justify-content-center" style={username? { backgroundColor: "rgba(85, 172, 238)" } : { backgroundColor: "rgba(85, 172, 238, 0.509)" }} role='button' >
                            <Card.Body>
                                <Twitter color='white' size={25} /> <small className={Styles.social_media_text}> TWITTER</small>
                            </Card.Body></Card>
                    </Col>
                </a>
                <a className={`${Styles.googleResults} ${!username? Styles.disable : ''}`} href={`https://www.youtube.com/results?search_query=${query}`} rel="noreferrer" target="_blank">
                    <Col className="align-items-center justify-content-center">
                        <Card className="align-items-center justify-content-center" style={username? { backgroundColor: "rgba(237, 48, 47)" } : { backgroundColor: "rgba(237, 48, 47, 0.509)" }} role='button' >
                            <Card.Body>
                                <Youtube color='white' size={25} /> <small className={Styles.social_media_text}> YOUTUBE</small>
                            </Card.Body></Card>
                    </Col>
                </a>
                <a className={`${Styles.googleResults} ${!username? Styles.disable : ''}`} href={`https://www.linkedin.com/search/results/all/?keywords=${query}`} rel="noreferrer" target="_blank">
                    <Col className="align-items-center justify-content-center">
                        <Card className="align-items-center justify-content-center" style={username? { backgroundColor: "rgba(0, 130, 202)" } : { backgroundColor: "rgba(0, 130, 202, 0.509)" }} role='button' >
                            <Card.Body>
                                <Linkedin color='white' size={25} /> <small className={Styles.social_media_text}> LINKEDIN</small>
                            </Card.Body></Card>
                    </Col>
                </a>
                <a className={`${Styles.googleResults} ${!username? Styles.disable : ''}`} href={`https://www.bing.com/search?q=${query}`} rel="noreferrer" target="_blank">
                    <Col className="align-items-center justify-content-center">
                        <Card className="align-items-center justify-content-center" style={username? { backgroundColor: "rgba(255, 185, 1)" } : { backgroundColor: "rgba(255, 185, 1, 0.509)" }} role='button' >
                            <Card.Body>
                                <Microsoft color='white' size={25} /> <small className={Styles.social_media_text}> BING</small>
                            </Card.Body></Card>
                    </Col>
                </a>
                <a className={`${Styles.googleResults} ${!username? Styles.disable : ''}`} href={`https://search.yahoo.com/search?p=${query}`} rel="noreferrer" target="_blank">
                    <Col className="align-items-center justify-content-center">
                        <Card className="align-items-center justify-content-center" style={username? { backgroundColor: "rgba(93, 1, 203)" } : { backgroundColor: "rgba(93, 1, 203, 0.509)" }} role='button' >
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
