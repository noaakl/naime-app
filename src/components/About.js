import Styles from "../App.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Card, Row, Col, Container } from 'react-bootstrap';
import poster from "../images/SISE_Name_Search_25.jpg"
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import PopularNames from './PopularNames';



const About = () => {
    return (
        <>
            <div className={Styles.page}>
                <h1>About nAIme</h1>
                {/* <div>More information</div> */}
            </div>
            <Container className={Styles.about_Container}>
                <Row lg={2} md={1} sm={1} xs={1} style={{ margin: "0", marginTop: "20px" }}>
                    <Col>
                        <Row className={Styles.about_row}>
                            <Card className={`${Styles.about_card} shadow-sm p-3 mb-3 bg-white rounded`} ><Card.Body className={Styles.card_body_about}>
                                    <h5>About Our Website</h5>
                                    Our nAIme website delivers the SpokenName2Vec and GRAFT novelty algorithms along with the Jellyfish package algorithms. Using these algorithms you will be able to retrieve alternative and similar names for a given name query.
                                    <br /><br />
                                    In this nAIme website you will also see different statistics on name searches such as all time top names searched and how many searches included your very own query. You will be able to rank the quality of the retrieved names, sort and filter the results to your liking.<br /><br />
                                    <strong>Enjoy our website and happy searching!</strong></Card.Body></Card>
                        </Row>
                        <Row className={Styles.about_row}>
                            <Card className={`${Styles.about_card} shadow-sm p-3 mb-3 bg-white rounded`} ><Card.Body className={Styles.card_body_about}>
                                    <h5>Who Are We?</h5>
                                    <p><b>Students: </b> Noaa Kless, Guy Shimony, Tal Meridor<br></br>
                                    <b>Academic Instructors:</b> Dr. Aviad Elyashar, Dr. Michael Fire, Dr. Rami Puzis<br></br></p>
                                </Card.Body></Card>
                        </Row>
                        <Row className={Styles.about_row}>
                            <Card className={`${Styles.about_card} shadow-sm p-3 mb-3 bg-white rounded`} ><Card.Body className={Styles.card_body_about}>
                                    <h5>Top 5 Searches</h5>
                                    <PopularNames />
                                </Card.Body></Card>
                        </Row>
                        <Row className={Styles.about_row}>
                            <Card className={`${Styles.about_card} shadow-sm p-3 mb-3 bg-white rounded`} ><Card.Body className={Styles.card_body_about}>
                                    <h5>More Information About the algorithms <Link to={"/AlgorithmsInfo"}><ArrowRightCircleFill style={{ marginLeft: "5px", color: "rgb(80, 128, 102)" }} /></Link></h5>
                                </Card.Body></Card>
                        </Row>


                    </Col>
                    <Col>
                        <Row className={Styles.about_row}>
                            <Card className={`${Styles.about_card} shadow-sm p-3 mb-3 bg-white rounded`}
                                
                            >

                                <Card.Body className={Styles.card_body_about}>
                                    <h5>"Search Name" Final Project</h5>
                                    This website is part of "Name Search" final project in the department of Software and Information Systems Engineering in Ben Gurion University of the Negev, Israel.
                                    </Card.Body></Card>
                        </Row>

                        <Row className={Styles.about_row}>
                            <Card className={`${Styles.about_card} shadow-sm p-3 mb-3 bg-white rounded`}
                            >
                                    <Card.Img src={poster} /></Card>
                        </Row>
                    </Col>


                </Row></Container>


        </>
    )
}

export default About;
