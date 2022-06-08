import Styles from "../App.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Card, Row, Col, Container } from 'react-bootstrap';
import SpokenName2Vec from "../SpokenName2Vec.jpeg"
import GRAFT from "../GRAFT.jpeg"



const Info = () => {
    return (
        <>
            <div className={Styles.page}>
                <h1>Algorithms</h1>
                <div>More information about the algorithms we use</div>
            </div>
            <Container style={{ paddingBottom: '100px' }}>
                <Row lg={2} md={1} sm={1} xs={1} style={{ margin: "0", marginTop: "20px" }}>
                    <Col>
                        <Row style={{ margin: "1px" }}>
                            <Card className="shadow-sm p-3 mb-3 bg-white rounded" style={{
                                miHeight: "500px", width: "100%", margin: 5, padding: 0,
                                justifyContent: "center"
                            }}><Card.Body className={Styles.card_body_about}>
                                    <h5 style={{ textAlign: "center" }}>SpokenName2Vec</h5>
                                    a novel and generic deep learning algorithm that utilizes automated speech in most given languages and accents for various name-related tasks.
                                    SpokenName2Vec algorithm generates a fixed-length vector representation derived from an audio segment that expresses the way people pronounce a name in a given language and accent.
                                    This model is much more sophisticated than other algorithms proposed for the task of synonym suggestion, and its ability to detect synonyms that sound alike but are written differently is notable.
                                    <Card.Img variant="bottom" src={SpokenName2Vec} className={Styles.card_img}/>
                                </Card.Body></Card>
                        </Row>
                    </Col>
                    <Col>
                        <Row style={{ margin: "1px" }}>
                            <Card className="shadow-sm p-3 mb-3 bg-white rounded" style={{
                                minHeight: "500px", width: "100%", margin: 5, padding: 0,
                                justifyContent: "center"
                            }}><Card.Body className={Styles.card_body_about}>
                                    <h5 style={{ textAlign: "center" }}>GRAFT</h5>
                                    a novel algorithm for improving the suggestion of alternative spellings associated with a name provided as a query.
                                    The algorithm based on the construction and analysis of digitized family trees, combined with network science.
                                    By constructing digitized family trees, the algorithm utilize the valuable ancestral information in these family trees to detect family members who share a similar name.
                                    Afterward, by connecting names that many family members have preserved over generations, we construct a graph based on names that reflects the evolution of names over generations.
                                    Then, we search for the name provided as a query in the graph and select candidates to be suggested as alternative names according to a general ordering function.
                                    <br></br><br></br>
                                    <Card.Img variant="bottom" src={GRAFT} className={Styles.card_img}/>
                                    <strong>for more information - click here for the artical </strong>
                                    </Card.Body></Card>
                        </Row>
                    </Col>


                </Row></Container>


        </>
    )
}

export default Info;
