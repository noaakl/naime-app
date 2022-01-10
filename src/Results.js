import React, { useState } from "react";
import Styles from './App.module.scss'
import SearchCount from './SearchCount'
import { Dropdown } from "react-bootstrap";

const Results = ({ searchedName, algorithemsData }) => {
    console.log(algorithemsData)
    const suggestionsExist = typeof algorithemsData.soundex !== 'undefined'
    const [sortValue, setSortValue] = useState("None")
    const [isAZData, setAZData] = useState(false)
    if (isAZData) {
        Object.keys(algorithemsData).forEach(algorithem => {
            console.log(algorithemsData[algorithem])
            algorithemsData[algorithem].sort(function(a, b) {
                return a.rank > b.rank;
              })
            algorithemsData[algorithem].forEach(data => {
                // console.log(data.candidate)
            })
        });
        // algorithemsData.map((algorithem) => {
        //     return algorithemsData[algorithem].map((name) => {

        //     })})
    }

    return suggestionsExist ?
        <div className={Styles.result_wrapper}>
            <div className={Styles.result_wrapper}>
                <h2 className={Styles.result_title}>Suggested Synonyms for the name '{searchedName}':</h2>
                <SearchCount searchedName={searchedName}/>
                {/* <svg className={Styles.info_icon} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48" >
                    <path fill="#F27054" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M22 22h4v11h-4V22zM26.5 16.5c0 1.379-1.121 2.5-2.5 2.5s-2.5-1.121-2.5-2.5S22.621 14 24 14 26.5 15.121 26.5 16.5z"></path>
                </svg> */}
            <div className={Styles.sort}>sort by</div>

            <Dropdown>
  <Dropdown.Toggle variant="secondary" size="sm" id="dropdown-basic">
    {sortValue}
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item 
    onClick={()=>{
        setAZData(false)
        setSortValue("None")
    }}>
        None</Dropdown.Item>
    <Dropdown.Item onClick={()=>{
        setAZData(true)
        setSortValue("A-Z")
    }}>A-Z</Dropdown.Item>
    {/* <Dropdown.Item onClick={()=>{}}>User Rank</Dropdown.Item> */}
  </Dropdown.Menu>
</Dropdown>


            </div>
            {Object.keys(algorithemsData).map((algorithem) => {
                return (
                    <ul key={algorithem}>
                        <li id={algorithem}>
                            <h3>{algorithem}</h3>
                        </li>
                        {algorithemsData[algorithem].map((name) => {
                            return (
                                <span key={`${algorithem}_${name.candidate}`} className={Styles.result}>{name.candidate}</span>
                            )
                        })}
                    </ul>)
            })}
            
        </div>
        : <div className={Styles.result_wrapper}>
            <h2>No Synonyms Suggested</h2>
        </div>
};

export default Results;