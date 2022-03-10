import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLikes, addDislikes } from "../store/action";
import LikeButton from "./LikeButton";
import { algorithems } from '../global/AlgorithemsConstants'
import axios from "axios";

const RankInfo = ({ searchedName, name, algorithem }) => {
    const dispatch = useDispatch()
    const username = useSelector((state) => state.reduser.username);
    const likes = useSelector((state) => state.reduser.likes);
    const dislikes = useSelector((state) => state.reduser.dislikes);

    const showLikeRank = algorithem in algorithems && (!dislikes[searchedName] || (dislikes[searchedName] && !dislikes[searchedName].includes(name.candidate)))
    const showDislikeRank = algorithem in algorithems && (!likes[searchedName] || (likes[searchedName] && !likes[searchedName].includes(name.candidate)))

    const disable = (ranks) => {
        return(!(ranks[searchedName] && ranks[searchedName].includes(name.candidate)))
    }

    const rankResults = (rank) => {
        name.add_rank = rank
        rank > 0 && username ? dispatch(addLikes(searchedName, name.candidate)) : dispatch(addDislikes(searchedName, name.candidate))
        if (algorithem in algorithems) {
            const rankData = {
                username: username,
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
            <LikeButton show={showLikeRank} name={name} rankFunc={rankResults} rank={1} disable={disable(likes)}/>
            <LikeButton show={showDislikeRank} name={name} rankFunc={rankResults} rank={-1} disable={disable(dislikes)}/>
        </>
    );
}

export default RankInfo;


// onMouseOver={() => getNameInfo(searchedName)}
// disabled={name.add_rank !== 0}