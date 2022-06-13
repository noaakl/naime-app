import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import axios from "axios";
import { Row, Col } from 'react-bootstrap';

const PopularNames = ({ searchedName }) => {
    const [topSearches, setTopSearches] = useState({});

    const getPopularNames = (searchVal) => {
        axios({
            method: "GET",
            url: `/api/popularSearches?name=${searchVal}`
        })
            .then((response) => {
                if (response.data !== {}) {
                    const data = {}
                    for (const i in response.data) {
                        const nameData = response.data[i]
                        data[nameData[0]] = nameData[1];
                    }
                    setTopSearches(data)
                }
            })
    }

    useEffect(() => {
        getPopularNames(searchedName)
    }, [])

    return (
        <Col>
            {Object.keys(topSearches).map((name) => {
                return (<Row key={name} style={{ margin: "5px" }}> <span><Link to={`/search/${name}`}>{'\n' + name}</Link>: {topSearches[name]} times </span></Row>)
            })}
        </Col>
    );
}

export default PopularNames;


