import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import axios from "axios";
import Styles from "../App.module.scss";
import Results from './Results';
import GoogleSearch from './GoogleSearch';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search } from 'react-bootstrap-icons';

const Home = () => {
    const username = useSelector((state) => state.reduser.username);
    const [suggestions, setSuggestions] = useState({})
    const [nameToSearch, setNameToSearch] = useState("")
    const [algorithemsData, setAlgorithemsData] = useState({})
    const [searchedName, setSearchedName] = useState("")
    const [showResults, setShowResults] = useState(false)
    const suggestionsExist = typeof algorithemsData.soundex !== 'undefined'

    useEffect(() => {
        setNameToSearch("")
        setAlgorithemsData({})
        setSearchedName("")
        setShowResults(false)
    }, [username]);

    const isValidSearchVal = (searchVal) => {
        return !/[^a-zA-Z]/.test(searchVal)
    }

    const validateSearchVal = (searchVal) => {
        const validSearchVal = isValidSearchVal(searchVal)
        return (
          <div
            className="errorValue"
            style={{
              display: !validSearchVal ? '' : 'none',
            }}
            >
            <h5 style={{ color: 'white', fontSize: '13px', marginRight: '320px'}}><strong>{"Please enter name with English characters only"}</strong></h5>
          </div>
        );
      };

    const searchName = (searchVal) => {
        const doSearch = searchVal !== '' && isValidSearchVal(searchVal)
        setShowResults(doSearch)
        if (doSearch) {
            setAlgorithemsData({})
            axios({
                method: "GET",
                url: `/api/suggestions?name=${searchVal}&username=${username}`
            })
                .then((response) => {
                    if (typeof response.data.soundex !== 'undefined') {
                        // console.log(response.data)
                        setSuggestions(response.data)
                        const spoken_name_2_vec = response.data.spoken_name_2_vec;
                        const double_metaphone = response.data.double_metaphone;
                        const family_trees = response.data.family_trees;
                        const match_rating_codex = response.data.match_rating_codex;
                        const metaphone = response.data.metaphone;
                        const nysiis = response.data.nysiis;
                        const soundex = response.data.soundex;
    
                        setSearchedName(response.data.name);
                        setAlgorithemsData({
                            'spoken_name_2_vec': spoken_name_2_vec,
                            'double_metaphone': double_metaphone,
                            'family_trees': family_trees,
                            'match_rating_codex': match_rating_codex,
                            'metaphone': metaphone,
                            'nysiis': nysiis,
                            'soundex': soundex
                        }
                        );
                    }
    
                })
        }
    }

    return (
        <>
        <div className={Styles.Search_container}>
            <div className={showResults ? Styles.page : Styles.search_page}>
                <h1 style={{textAlign:"center"}}>nAIme</h1>
                <div style={{textAlign:"center"}}>Similar Name Suggestor</div>
                <div className={Styles.search_wraper} >
                    <div className={Styles.search_inner}>
                        <input className={Styles.form_control} value={nameToSearch} onKeyPress={(e) => e.key === "Enter" ? searchName(nameToSearch) : ""}
                            onChange={(e) => setNameToSearch(e.target.value)} placeholder="Write name here (i.e Mike, Christina)" />
                        <span className={Styles.search_btn}>
                            <button className={Styles.search_btn} id="searchName" onClick={() => { searchName(nameToSearch) }} method="POST" >
                                <Search size={20} />
                            </button>
                        </span>
                    </div>
                    {validateSearchVal(nameToSearch)}
                </div>
            </div>

            {showResults && (
                <>
                    <div className={Styles.container_fluid}>
                        <Results searchedName={searchedName} algorithemsData={algorithemsData} suggestionsExist={suggestionsExist} />
                    </div>
                    <div>
                        <div className={Styles.container_fluid}>
                            <GoogleSearch searchedName={searchedName} suggestions={suggestions} suggestionsExist={suggestionsExist} />
                        </div>
                    </div>
                </>
            )
            }
</div>
        </>
    )
}

export default Home;
