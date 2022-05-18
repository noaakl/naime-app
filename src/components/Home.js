import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Styles from "../App.module.scss";
import Results from './Results';
import GoogleSearch from './GoogleSearch';
import GoogleIFrame from './GoogleIFrame';
import SocialMedia from './SocialMedia';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search, XCircle } from 'react-bootstrap-icons';
import { Card, Row, Col, Container } from 'react-bootstrap'


const Home = () => {
    const username = useSelector((state) => state.reduser.username);
    const [suggestions, setSuggestions] = useState([])
    const [ranks, setRanks] = useState([])
    const [nameToSearch, setNameToSearch] = useState("")
    const [nameValue, setNameValue] = useState("")
    const [algorithmsData, setAlgorithmsData] = useState([])
    const [searchedNames, setSearchedNames] = useState([])
    const [showResults, setShowResults] = useState(false)
    const suggestionsExist = algorithmsData.length > 0

    useEffect(() => {
        // setNameToSearch("")
        setRanks([])
        // setNameValue("")
        setSuggestions([])
        setAlgorithmsData([])
        setSearchedNames([])
        setShowResults(false)
    }, [username]);

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
        setNameValue("")
        let searchVal = ""
        searchVal = nameValue
        const doSearch = searchVal !== '' && isValidSearchVal(searchVal)
        setShowResults(doSearch)
        if (doSearch) {
            setNameToSearch(nameValue)
            setAlgorithmsData({})
            setRanks({})
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
                                'SpokenName2Vec': spoken_name_2_vec,
                                'Double Metaphone': double_metaphone,
                                'GRAFT': family_trees,
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

                    axios({
                        method: "GET",
                        url: `/api/rankCount`, //TODO: split searchval,
                        params: { "name": searchVal }
                    })
                        .then((response) => {
                            let addedRanks = []
                            response.data.forEach(ranksData => {
                                if (typeof ranksData.likes !== 'undefined') {
                                    const likes = ranksData.likes
                                    const dislikes = ranksData.dislikes
                                    addedRanks = [...addedRanks, {
                                        'likes': likes,
                                        'dislikes': dislikes
                                    }];
                                    // setRanks({'likes': likes,
                                    //         'dislikes': dislikes})
                                }
                            })
                            setRanks(addedRanks);
                            console.log(ranks)
                        })
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

                <div style={{ display: suggestionsExist && !username ? 'inline' : 'none', }} className={Styles.container_fluid}>
                    <div className={Styles.result_wrapper}>
                        <div className={Styles.result_wrapper}>
                            <Container>
                                <Row className="justify-content-center" style={{ marginTop: "50px", marginBottom: "4px" }}>
                                    {/* <Col className="justify-content-center"> */}
                                    <Card className="flex-fill mx-auto" style={{ width: "90%" }}><Card.Body style={{ textAlign: "center" }}><b>Do you want to rank your results? keep track of your searchs? <br /><Link to={"/signup"}>CLICK HERE</Link> to sign up </b></Card.Body></Card>
                                    {/* </Col> */}
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>

                <div style={{ display: nameToSearch !== "" ? 'inline' : 'none', }} >

                    {searchedNames.length === 0 ? (<div className={Styles.no_result_wrapper}>
                        <h2>No Synonyms Suggested for the Name <b><i>{nameToSearch.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</i></b></h2>
                    </div>)
                        : (<Row className={Styles.result_wrapper}>
                            <Col className={Styles.result_title} style={{ margin: "30px 0 0 0 " }}>
                                <h3>Suggested Synonyms for the Name <b><i>{nameToSearch.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</i></b></h3>
                            </Col>
                        </Row>)}



                    <div className={Styles.container_fluid}>

                        {
                            Array.from({ length: searchedNames.length })
                                .map((_, index) => {
                                    const name = searchedNames[index]
                                    const showSuggestions = showResults && suggestionsExist && name !== "" && typeof algorithmsData[index].Soundex !== 'undefined'
                                    // const showSuggestions = false
                                    // console.log(searchedNames[index])
                                    return (
                                        <Results key={index} searchedName={name} algorithmsData={algorithmsData[index] ? algorithmsData[index] : []} showSuggestions={showSuggestions} ranks={ranks[index] ? ranks[index] : []} />
                                    )
                                }
                                )
                        }
                        {/* </div> */}

                        {/* <div> */}
                        <div className={Styles.container_fluid}>
                            <div style={{ marginTop: "100px" }}>
                                <SocialMedia searchedName={nameToSearch} suggestions={suggestions} suggestionsExist={showResults && suggestionsExist} algorithmsData={algorithmsData}/>
                            </div>

                            {/* <div style={{ marginTop: "100px" }}>
                                {suggestionsExist && <GoogleSearch searchedName={nameToSearch} suggestions={suggestions} suggestionsExist={showResults && suggestionsExist} />}
                            </div> */}

                        {/* <div >
                            {suggestionsExist && <GoogleIFrame searchedName={nameToSearch} suggestions={suggestions} suggestionsExist={suggestionsExist} />}
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;

