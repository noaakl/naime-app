import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLikes, addDislikes, removeLikes, removeDislikes } from "../store/action";
import LikeButton from "./LikeButton";
import axios from "axios";
import { HandThumbsUpFill, HandThumbsDownFill } from 'react-bootstrap-icons';

const RankInfo = ({ searchedName, name, algorithm, rankLikes, rankDislikes, handleAddLike, handleremoveLike }) => {
    const dispatch = useDispatch()
    const username = useSelector((state) => state.reduser.username);
    const likes = useSelector((state) => state.reduser.likes);
    const dislikes = useSelector((state) => state.reduser.dislikes);
    const showNotUser = !username
    const likedThisName = username && likes[searchedName] && likes[searchedName].includes(name.candidate)
    const dislikedThisName = username && dislikes[searchedName] && dislikes[searchedName].includes(name.candidate)
    const show = username
    const disable = (rank) => {
        if (rank === 1) {
            return (dislikes[searchedName] && dislikes[searchedName].includes(name.candidate))
        }
        else {
            return (likes[searchedName] && likes[searchedName].includes(name.candidate))
        }
    }


    const rankResults = (rank) => {
        handleAddLike(rank, name.candidate)
        name.add_rank = rank
        rank > 0 && username ? dispatch(addLikes(searchedName, name.candidate)) : dispatch(addDislikes(searchedName, name.candidate))
        const rankData = {
            username: username,
            type_name: algorithm,
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
        axios.put('/api/rankResults', rankData)
            .catch(function (error) {
                console.log(error);
            });
    }

    const removeRankResult = (rank) => {
        handleremoveLike(rank, name.candidate)
        name.remove_rank = rank
        rank > 0 && username ? dispatch(removeLikes(searchedName, name.candidate)) : dispatch(removeDislikes(searchedName, name.candidate))
        const rankData = {
            username: username,
            type_name: algorithm,
            selected_name: searchedName,
            remove_rank: name.remove_rank,
            candidate: name.candidate,
            distance: name.distance,
            edit_distance: name.edit_distance,
            language: name.language,
            rank: name.rank,
            user_rank: name.user_rank,
            like: name.like,
            dislike: name.dislike
        }
        axios.put('/api/editResults', rankData)
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            {showNotUser && <><HandThumbsUpFill color="rgba(54, 105, 35, 1)" style={{ marginRight: "3px" }} /><small style={{ fontSize: "10px" }}>{rankLikes}</small>
                <HandThumbsDownFill color="rgba(240, 92, 62, 1)" style={{ marginRight: "3px", marginLeft: "8px" }} /><small style={{ fontSize: "10px" }}>{rankDislikes}</small></>}
            <LikeButton show={show} fill={likedThisName} name={name} rankFunc={rankResults} removeFunc={removeRankResult} rank={1} disable={disable(1)} rankLikes={rankLikes} rankDislikes={rankDislikes} />
            <LikeButton show={show} fill={dislikedThisName} name={name} rankFunc={rankResults} removeFunc={removeRankResult} rank={-1} disable={disable(-1)} rankLikes={rankLikes} rankDislikes={rankDislikes} />
        </>
    );
}

export default RankInfo;