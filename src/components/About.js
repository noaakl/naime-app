import Styles from "../App.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Card, Row, Col, Container } from 'react-bootstrap';
import poster from "../SISE_Name_Search_25.jpg"
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
            <Container style={{ paddingBottom: '100px' }}>
                <Row lg={2} md={1} sm={1} xs={1} style={{ margin: "0", marginTop: "20px" }}>
                    <Col>
                    <Row style={{margin:"1px"}}>
                    <Card className="shadow-sm p-3 mb-3 bg-white rounded" style={{ width: "100%", margin: 5, padding: 0,
                            justifyContent: "center"
                        }}><Card.Body className={Styles.card_body_about}>
                            <h5>About Our Website</h5>
                                Our nAIme website delivers the SpokenName2Vec and GRAFT novelty algorithms along with the Jellyfish package algorithms. Using these algorithms you will be able to retrieve alternative and similar names for a given name query.
                                <br /><br />
                        In this nAIme website you will also see different statistics on name searches such as all time top names searched and how many searches included your very own query. You will be able to rank the quality of the retrieved names, sort and filter the results to your liking.<br /><br />
                        <strong>Enjoy our website and happy searching!</strong></Card.Body></Card>
                    </Row>
                    <Row style={{margin:"1px"}}>
                    <Card className="shadow-sm p-3 mb-3 bg-white rounded" style={{width: "100%", margin: 5, padding: 0,
                            justifyContent: "center"
                        }}><Card.Body className={Styles.card_body_about}>
                            <h5>How Are We?</h5>
                            <b>Students: </b>Students: Guy Shimony, Tal Meridor, Noaa Kless<br></br>
                            <b>Academic Instructors:</b> Dr. Aviad Elyashar, Dr. Michael Fire, Dr. Rami Puzis<br></br>
                            </Card.Body></Card>
                    </Row>
                    <Row style={{margin:"1px"}}>
                    <Card className="shadow-sm p-3 mb-3 bg-white rounded" style={{width: "100%", margin: 5, padding: 0,
                            justifyContent: "center"
                        }}><Card.Body className={Styles.card_body_about}>
                            <h5>More Information About the algorithms <Link to={"/info"}><ArrowRightCircleFill style={{marginLeft:"5px", color:"rgb(80, 128, 102)"}}/></Link></h5>
                            </Card.Body></Card>
                    </Row>
                    <Row style={{margin:"1px"}}>
                    <Card className="shadow-sm p-3 mb-3 bg-white rounded" style={{width: "100%", margin: 5, padding: 0,
                            justifyContent: "center"
                        }}><Card.Body className={Styles.card_body_about}>
                            <h5>Top 5 Searches</h5>
                            <PopularNames />
                            </Card.Body></Card>
                    </Row>


                    </Col>
                    <Col>
                    <Row style={{margin:"1px"}}>
                        <Card className="shadow-sm p-3 mb-3 bg-white rounded"
                            style={{
                                 width: "100%", margin: 5, padding: 0,
                                justifyContent: "center"
                            }}
                        > 
                       
                            <Card.Body className={Styles.card_body_about}>                            
                            <h5>"Search Name" Final Project</h5>
                            This website is part of "Name Search" final project in the department of Software and Information Systems Engineering in Ben Gurion University of the Negev, Israel.
                            <Card.Img variant="bottom" src={poster} className={Styles.card_img}/></Card.Body></Card>
                            </Row>
                    </Col>
                                            
                   
                </Row></Container>


        </>
    )
}

export default About;
