import React, { useState } from "react";
import LikeButton from "./LikeButton";
import { algorithems } from './AlgorithemsConstants'
import axios from "axios";

const RankInfo = ({ searchedName, name, algorithem }) => {
    // const [name, setName] = useState(candidateName)
    const [likedRanks, setLikedRanks] = useState([])
    const [dislikedRanks, setDislikedRanks] = useState([])
    const showLikeRank = algorithem in algorithems && name?.add_rank !== -1
    const showDislikeRank = algorithem in algorithems && name?.add_rank !== 1

    const rankResults = (rank) => {
        name.add_rank = rank
        rank > 0 ? setLikedRanks([name].concat(likedRanks)) : setDislikedRanks([name].concat(dislikedRanks))
        if (algorithem in algorithems) {
            const rankData = {
                type_name: algorithem,
                selected_name: searchedName,
                add_rank: name.add_rank,
                candidate: name.candidate,
                distance: name.distance,
                edit_distance: name.edit_distance,
                language: name.language,
                rank: name.rank,
                user_rank: name.user_rank,
                like: name.like,
                dislike: name.dislike
            }
            axios.put('/rankResults', rankData)
            // .then(
            //     function (response) {
            //         setName(response.data)
            //     })
              .catch(function (error) {
                console.log(error);
            });
        }
    }

    return (
        <>
            <LikeButton show={showLikeRank} name={name} rankFunc={rankResults} rank={1}/>
            <LikeButton show={showDislikeRank} name={name} rankFunc={rankResults} rank={-1}/>
        </>
    );
}

export default RankInfo;


// onMouseOver={() => getNameInfo(searchedName)}
// disabled={name.add_rank !== 0}