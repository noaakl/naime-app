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


    const searchName = (searchVal) => {
        setShowResults(searchVal !== '')
        setAlgorithemsData({})
        // const searchInfo = {
        //     user_name: username,
        //     selected_name: searchVal
        // }
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

    return (
        <>
            <div className={showResults ? Styles.page : Styles.search_page}>
                <h1>nAIme</h1>
                <div>Similar Name Suggestor</div>
                <div className={Styles.search_wraper} >
                    <div className={Styles.search_inner}>
                        <input className={Styles.form_control} value={nameToSearch} onKeyPress={(e) => e.key === "Enter" ? searchName(nameToSearch) : ""}
                            onChange={(e) => setNameToSearch(e.target.value)} placeholder="Write name here (i.e Mike, Christina)" />
                        <span className={Styles.search_btn}>
                            <button className={Styles.search_btn} id="searchName" onClick={() => { searchName(nameToSearch) }} method="POST" >
                                <Search size={20} />
                                {/* <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" color="pink">
                                    <path d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM17.0977 6.9336C21.3785 6.9336 24.8477 10.4047 24.8477 14.6855C24.8477 18.9664 21.3785 22.4355 17.0977 22.4355C15.8022 22.4355 14.5812 22.1186 13.5078 21.5566C13.5089 21.5616 13.5106 21.5673 13.5117 21.5723L10.0156 25.0664L7.15235 22.2012L10.5234 18.8281C10.529 18.8256 10.5354 18.8247 10.541 18.8223C9.78403 17.6251 9.34571 16.2066 9.34571 14.6855C9.34571 10.4047 12.8168 6.9336 17.0977 6.9336ZM17.0977 10.377C14.7186 10.377 12.7891 12.3065 12.7891 14.6855C12.7891 17.0646 14.7186 18.9922 17.0977 18.9922C19.4767 18.9922 21.4043 17.0646 21.4043 14.6855C21.4043 12.3065 19.4767 10.377 17.0977 10.377Z" fill="#F27054" />
                                </svg> */}
                            </button>
                        </span>
                    </div>
                </div>
            </div>

            {showResults && (
                <>
                    <div className={Styles.container_fluid}>
                        <Results searchedName={searchedName} algorithemsData={algorithemsData} suggestionsExist={suggestionsExist} />
                    </div>
                    <div className={Styles.google}>
                        <div className={Styles.container_fluid}>
                            <GoogleSearch searchedName={searchedName} suggestions={suggestions} suggestionsExist={suggestionsExist} />
                        </div>
                    </div>
                </>
            )
            }

        </>
    )
}

export default Home;
