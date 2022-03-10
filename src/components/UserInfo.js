import { useState } from 'react'
import { useSelector } from "react-redux";
import axios from "axios";
import Styles from "../App.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

const UserInfo = () => {
    const username = useSelector((state) => state.reduser.username);

    const getLastUserSearches = () => {
        axios({
            method: "GET",
            url: `/lastSearches?username=${username}`
        })
            .then((response) => {
                console.log(response.data)
            })
    }

    const getLastUserRanks = () => {
        axios({
            method: "GET",
            url: `/lastRanks?username=${username}`
        })
            .then((response) => {
                console.log(response.data)
            })
    }

    return (
        <>
            <div className={Styles.page_title}>
                <button onClick={()=>getLastUserSearches()}>get last searches</button>
                <button onClick={()=>getLastUserRanks()}>get last ranks</button>
            </div>

        </>
    )
}

export default UserInfo;
