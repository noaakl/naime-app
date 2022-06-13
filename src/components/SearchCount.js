import { useState, useEffect } from 'react'
import axios from "axios";
import { InfoCircleFill } from 'react-bootstrap-icons';

const SearchCount = ({ searchedName }) => {
    // const [count, setCount] = useState(0);
    const [count, setCount] = useState(137);

    useEffect(() => {
        getNameInfo(searchedName)
    }, []);

    const getNameInfo = (searchVal) => {
        axios({
          method: "GET",
          url: `/api/searchList?name=${searchVal}`
        })
        // .then((response) => {
        //     setCount(response.data.count)
        // })
        }

    return (
        <>
        <InfoCircleFill style={{color: 'rgb(80, 128, 102)'}} /> The name <strong>'{searchedName}'</strong> was searched {'\n'}<strong>{count}</strong> times.{'\n'}{'\n'}
         <br/>
         For more information about '{searchedName}' please see <a target="_blank" rel="noreferrer" href={`https://www.behindthename.com/name/${searchedName}`}>Behind The Name</a>
        </>
    );
}

export default SearchCount;


