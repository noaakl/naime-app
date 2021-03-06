import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Styles from "../App.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import Avatar from 'react-avatar';
import React, { useState, useMemo } from "react";
import { Card, Row, Col, Table, Container } from 'react-bootstrap';
import { HandThumbsUpFill, HandThumbsDownFill } from 'react-bootstrap-icons';
import { Search } from 'react-bootstrap-icons';


const UserInfo = () => {
    const [lastsearch, setlastsearch] = useState([])
    const [lastranks, setLastranks] = useState([])
    const [lastdislike, setLastdislike] = useState([])

    const likesNumber = useSelector((state) => state.reduser.likesCount);
    const dislikesNumber = useSelector((state) => state.reduser.dislikesCount);
    const username = useSelector((state) => state.reduser.username);
    const first_name = useSelector((state) => state.reduser.firstName);
    const last_name = useSelector((state) => state.reduser.lastName);
    const fullname = first_name + " " + last_name;
    const email = useSelector((state) => state.reduser.email);

    const getLastUserSearches = () => {
        axios({
            method: "GET",
            url: `/api/lastSearches?username=${username}`
        })
            .then((response) => {
                let searches = [];

                for (const i in response.data) {
                    searches.push(response.data[i]);
                }
                setlastsearch(searches)
            })
    }

    const getLastUserRanks = () => {
        axios({
            method: "GET",
            url: `/api/lastRanks?username=${username}`
        })
            .then((response) => {
                setLastranks(response.data)
            })
    }

    const getlastDislike = () => {
        axios({
            method: "GET",
            url: `/api/lastDislike?username=${username}`
        })
            .then((response) => {
                setLastdislike(response.data)
            })
    }

    const getUserInfo = () => {
        getLastUserSearches()
        getLastUserRanks()
        getlastDislike()
    }


    useMemo(() => {
        getUserInfo()
    }, []);

    return (
        <>
            <div className={Styles.page}>
                <h1>Hello {username}</h1>
                <div>Here is your info. Enjoy!</div>
            </div>
            <Container style={{ paddingBottom: '100px' }}>
                <Row style={{ margin: "0", marginTop: "20px" }}>
                    <Col>
                        <Card className="shadow-sm p-3 mb-3 bg-white rounded"
                            style={{ height: '400px', width: "100%", margin: 5 }}
                        ><Card.Body style={{ margin: 0, padding: 0 }}>
                                <Avatar name={fullname} round={true} style={{ margin: "5px" }} color="green" />
                                <br></br>
                                <br></br>
                                <h6>User Name: {username}</h6>
                                <h6>Full Name: {fullname}</h6>
                                <h6>Email: {email}</h6>
                                <HandThumbsUpFill color="rgba(54, 105, 35, 1)" style={{ margin: "5px" }} /> {likesNumber}
                                <HandThumbsDownFill color="rgba(240, 92, 62, 1)" style={{ margin: "5px" }} /> {dislikesNumber}</Card.Body></Card>
                    </Col>
                    <Col>
                        <Card className="shadow-sm p-3 mb-3 bg-white rounded"
                            style={{
                                height: '400px', width: "100%", margin: 5, padding: 0,
                                justifyContent: "center"
                            }}
                        ><Card.Body style={{ margin: 0, padding: 0, marginTop: "20px" }}>
                                <div><h5 style={{ textAlign: "center" }}>Likes <HandThumbsUpFill /></h5></div>
                                <Table striped bordered>
                                    <thead><tr><th>Name</th>
                                        <th>Synonym</th></tr></thead>
                                    <tbody>
                                        {lastranks.length !== 0 && lastranks?.map((rank) => {
                                            return (
                                                <tr key={rank} ><td>{rank[0]}</td>
                                                    <td>{rank[1]}</td></tr>
                                            )
                                        })}
                                    </tbody></Table></Card.Body></Card>

                    </Col>
                    <Col>
                        <Card className="shadow-sm p-3 mb-3 bg-white rounded"
                            style={{
                                height: '400px', width: "100%", margin: 5, padding: 0,
                                justifyContent: "center"
                            }}
                        ><Card.Body style={{ margin: 0, padding: 0, marginTop: "20px" }}>
                                <div><h5 style={{ textAlign: "center" }}>Dislikes <HandThumbsDownFill /></h5></div>
                                <Table striped bordered>
                                    <thead><tr><th>Name</th>
                                        <th>Synonym</th></tr></thead>
                                    <tbody>
                                        {lastdislike.length !== 0 && lastdislike.map((dislike) => {
                                            return (
                                                <tr key={dislike} ><td>{dislike[0]}</td>
                                                    <td>{dislike[1]}</td></tr>
                                            )
                                        })}
                                    </tbody></Table></Card.Body></Card>
                    </Col>
                    <Col>
                        <Card className="shadow-sm p-3 mb-3 bg-white rounded"
                            style={{ height: '400px', width: "100%", margin: 5, padding: 0 }}
                        ><Card.Body style={{ margin: 0, padding: 0, marginTop: "20px", textAlign: "center" }}>
                                <div><h5>Searches <Search /></h5></div>

                                {lastsearch.length !== 0 && lastsearch.map((search, _) => {
                                    return (<div key={_} style={{ marginRight: "10px", marginBottom: "7px" }}><Link to={`/search/${search}`}>{search}</Link></div>)
                                })}</Card.Body></Card></Col>
                </Row></Container>
        </>
    )
}

export default UserInfo;
