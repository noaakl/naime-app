import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Styles from "../App.module.scss";
import Results from './Results';
import GoogleSearch from './GoogleSearch';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search, XCircle } from 'react-bootstrap-icons';
import { Card, Row } from 'react-bootstrap'


const Home = () => {
    const username = useSelector((state) => state.reduser.username);
    // const [suggestions, setSuggestions] = useState({})
    const [suggestions, setSuggestions] = useState([])
    const [nameToSearch, setNameToSearch] = useState("")
    const [nameValue, setNameValue] = useState("")
    // const [algorithmsData, setAlgorithmsData] = useState({})
    const [algorithmsData, setAlgorithmsData] = useState([])
    // const [searchedNames, setSearchedNames] = useState("")
    const [searchedNames, setSearchedNames] = useState([])
    const [showResults, setShowResults] = useState(false)
    // const [results, setResults] = useState([])

    console.log(nameValue)
    // console.log(searchedNames)
    // const suggestionsExist = typeof algorithmsData.Soundex !== 'undefined'
    const suggestionsExist = algorithmsData.length > 0

    useEffect(() => {
        // setNameValue("")
        // setAlgorithmsData({})
        // setSearchedNames("")
        setNameValue("")
        setSuggestions([])
        setAlgorithmsData([])
        setSearchedNames([])
        // setResults([])
        setShowResults(false)
    }, [username]);

    // useEffect(() => {
    //     let res = []
    //     for (let i = 0; i < searchedNames.length; i++) {
    //         res.push(i)
    //     }
    //     setResults(res)
    // }, [searchedNames]);

    const isValidSearchVal = (searchVal) => {
        return !/[^a-zA-Z\s]/.test(searchVal)
    }

    const validateSearchVal = () => {
        const validSearchVal = isValidSearchVal(nameValue)
        return (
            <div
                className="errorValue"
                style={{
                    display: !validSearchVal ? '' : 'none',
                }}
            >
                <h5 style={{ color: 'red', fontSize: '15px', marginRight: '270px' }}><XCircle style={{ marginBottom: '2px' }} />{" Please enter name with English characters only"}</h5>
            </div>
        );
    };

    const searchName = () => {
        // setNameValue("")
        let searchVal = ""
        searchVal = nameValue
        const doSearch = searchVal !== '' && isValidSearchVal(searchVal)
        setShowResults(doSearch)
        if (doSearch) {
            setNameToSearch(nameValue)
            setAlgorithmsData({})
            const searchData = {
                // "name": searchVal.split(' '),
                "name": searchVal,
                "username": username
            }
            // axios.get('/api/suggestions', {params: searchData})
            // axios.get('/api/suggestions', searchData)
            axios({
                method: "GET",
                url: `/api/suggestions`, //TODO: split searchval,
                params: searchData
            })

                // axios({
                //     method: "GET",
                //     url: `/api/suggestions?name=${searchVal}&username=${username}` //TODO: split searchval
                // })
                .then((response) => {
                    // console.log(response.data)
                    // let index = 0
                    let addedSuggestions = []
                    let addedSearchedNames = []
                    let addedAlgorithmsData = []
                    response.data.forEach(suggestionsData => {
                        if (typeof suggestionsData.soundex !== 'undefined') {
                            // console.log(suggestionsData)
                            // setSuggestions([...addedSuggestions, suggestionsData])
                            // suggestionsData['index'] = index
                            addedSuggestions = [...addedSuggestions, suggestionsData];
                            const spoken_name_2_vec = suggestionsData.spoken_name_2_vec;
                            const double_metaphone = suggestionsData.double_metaphone;
                            const family_trees = suggestionsData.family_trees;
                            const match_rating_codex = suggestionsData.match_rating_codex;
                            const metaphone = suggestionsData.metaphone;
                            const nysiis = suggestionsData.nysiis;
                            const soundex = suggestionsData.soundex;

                            // setSearchedNames([...oldSearchedNames, suggestionsData.name]);
                            addedSearchedNames = [...addedSearchedNames, suggestionsData.name];
                            addedAlgorithmsData = [...addedAlgorithmsData, {
                                'Spoken Name 2 Vec': spoken_name_2_vec,
                                'Double Metaphone': double_metaphone,
                                'Graft': family_trees,
                                'Match Rating Codex': match_rating_codex,
                                'Metaphone': metaphone,
                                'Nysiis': nysiis,
                                'Soundex': soundex
                            }];
                        }

                    });
                    setSuggestions(addedSuggestions);
                    setSearchedNames(addedSearchedNames);
                    setAlgorithmsData(addedAlgorithmsData);
                })
        }
    }

    return (
        <>
            <div className={Styles.Search_container}>
                <div className={showResults ? Styles.page : Styles.search_page}>
                    <h1 style={{ textAlign: "center" }}>nAIme</h1>
                    <div style={{ textAlign: "center" }}>Similar Name Suggestor</div>
                    <div className={Styles.search_wraper} >
                        <div className={Styles.search_inner}>
                            <input className={Styles.form_control} value={nameValue} onKeyPress={(e) => e.key === "Enter" ? searchName() : ""}
                                onChange={(e) => setNameValue(e.target.value)} placeholder="Write name here (i.e Mike, Christina)" />
                            <span className={Styles.search_btn}>
                                <button className={Styles.search_btn} id="searchName" onClick={() => { searchName() }} method="POST" >
                                    <Search size={20} />
                                </button>
                            </span>
                        </div>
                        {validateSearchVal()}
                    </div>
                </div>

                <div style={{ display: suggestionsExist ? 'inline' : 'none', }} className={Styles.container_fluid}>
                    <div className={Styles.result_wrapper}>
                        <div className={Styles.result_wrapper}>
                            <Row style={{ marginTop: "50px" }}>
                                <Card><Card.Body style={{ textAlign: "center" }}><b>Do you want to rank your results? keep track on your searchs? <br /><Link to={"/signup"}>CLICK HERE</Link> to sign up </b></Card.Body></Card>
                            </Row>
                        </div>
                    </div>
                </div>

                <div className={Styles.container_fluid}>

                    {
                        Array.from({ length: searchedNames.length })
                            .map((_, index) => {
                                const name = searchedNames[index]
                                const showSuggestions = showResults && suggestionsExist && name!=="" && typeof algorithmsData[index].Soundex !== 'undefined'
                                // console.log(searchedNames[index])
                                return (
                                    <Results key={index} searchedName={name} algorithmsData={algorithmsData[index] ? algorithmsData[index] : []} showSuggestions={showSuggestions} />
                                )
                            }
                            )
                    }
                </div>

                <div>
                    <div className={Styles.container_fluid}>
                        {suggestionsExist && <GoogleSearch searchedName={nameToSearch} suggestions={suggestions} suggestionsExist={showResults && suggestionsExist} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;

