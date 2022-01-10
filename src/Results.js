import React from "react";
import Styles from './App.module.scss'
import SearchCount from './SearchCount'

const Results = ({ searchedName, algorithemsData }) => {
    const suggestionsExist = typeof algorithemsData.soundex !== 'undefined'
    return suggestionsExist ?
        <div className={Styles.result_wrapper}>
            <div className={Styles.result_wrapper}>
                <h2 className={Styles.result_title}>Suggested Synonyms for the name '{searchedName}':</h2>
                <SearchCount searchedName={searchedName}/>
            </div>
            {Object.keys(algorithemsData).map((algorithem) => {
                return (
                    <ul>
                        <li id={algorithem}>
                            <h3>{algorithem}</h3>
                        </li>
                        {algorithemsData[algorithem].map((name) => {
                            return (
                                <span>{name.candidate}</span>
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