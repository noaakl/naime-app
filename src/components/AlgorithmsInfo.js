import Styles from "../App.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from "react";
import { Card, Row, Col, Container } from 'react-bootstrap';
import SpokenName2Vec from "../images/SpokenName2Vec.jpeg"
import GRAFT from "../images/GRAFT.jpeg"

const AlgorithmsInfo = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className={Styles.page}>
                <h1>Algorithms</h1>
                <div>More information about the algorithms we use</div>
            </div>
            <Container className={Styles.about_Container}>
                <Row lg={2} md={1} sm={1} xs={1} style={{ margin: "0", marginTop: "20px" }}>
                    <Col>
                        <Row className={Styles.about_row}>
                            <Card className={`${Styles.algorithms_info_card} shadow-sm p-3 mb-3 bg-white rounded`} >
                                <Card.Body className={Styles.card_body_about}>
                                    <h5>SpokenName2Vec</h5><br></br>
                                    <p>A novel and generic deep learning algorithm that utilizes automated speech in most given languages and accents for various name-related tasks.
                                        The SpokenName2Vec algorithm encodes a text into a simple plaintext code and generates a fixed-length vector representation derived from an audio segment that expresses the way people pronounce a name in a given language and accent. This model is much more sophisticated than other algorithms proposed for the task of synonym suggestion, and its ability to detect synonyms that sound alike but are written differently is notable.</p>
                                    <br></br>
                                    <Card.Img variant="bottom" src={SpokenName2Vec} />
                                    <br></br><br></br>
                                    <strong>For more information - Click <a href='https://doi.org/10.1016/j.knosys.2021.107229' target="_blank" rel="noreferrer" >HERE</a> for the article </strong>
                                </Card.Body></Card>
                        </Row>
                    </Col>
                    <Col>
                        <Row className={Styles.about_row}>
                            <Card className={`${Styles.algorithms_info_card} shadow-sm p-3 mb-3 bg-white rounded`} ><Card.Body className={Styles.card_body_about}>
                                <h5>GRAFT</h5><br></br>
                                <p>A novel algorithm for improving the suggestion of alternative spellings associated with a name provided as a query.
                                    The algorithm is based on the construction and analysis of digitized family trees, combined with network science.
                                    By constructing digitized family trees, the algorithm utilizes the valuable ancestral information in these family trees to detect family members who share a similar name. A graph is constructed by connecting names that many family members have preserved over generations. This graph is based on names that reflect the evolution of names over generations.
                                    The name provided as a query is searched in the graph and candidates are suggested as alternative names according to a general ordering function consisting of the network’s structure, the string and the phonetic similarity between the name provided as a query and the candidate.</p>
                                <br></br>
                                <Card.Img variant="bottom" src={GRAFT} />
                                <br></br><br></br>
                                <strong>For more information - Click <a href='https://doi.org/10.1109/TKDE.2021.3096670' target="_blank" rel="noreferrer">HERE</a> for the article </strong>
                            </Card.Body>
                            </Card>
                        </Row>
                    </Col>


                </Row></Container>


        </>
    )
}

export default AlgorithmsInfo;
