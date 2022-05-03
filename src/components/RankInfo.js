import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLikes, addDislikes,removeLikes,removeDislikes } from "../store/action";
import LikeButton from "./LikeButton";
import { algorithms } from '../global/AlgorithmsConstants'
import axios from "axios";
import { HandThumbsUpFill, HandThumbsDownFill } from 'react-bootstrap-icons';

const RankInfo = ({ searchedName, name, algorithm }) => {
    const dispatch = useDispatch()
    const username = useSelector((state) => state.reduser.username);
    const likes = useSelector((state) => state.reduser.likes);
    const dislikes = useSelector((state) => state.reduser.dislikes);
    // const likesNumber = useSelector((state) => state.reduser.likesCount);
    // const dislikesNumber = useSelector((state) => state.reduser.dislikesCount);

    const showNotUser = !username && algorithm in algorithms
    // const showLikeRank = username && algorithm in algorithms && (!dislikes[searchedName] || (dislikes[searchedName] && !dislikes[searchedName].includes(name.candidate)))
    // const showDislikeRank = username && algorithm in algorithms && (!likes[searchedName] || (likes[searchedName] && !likes[searchedName].includes(name.candidate)))
    
    const likedThisName = username && algorithm in algorithms && likes[searchedName] && likes[searchedName].includes(name.candidate)
    const dislikedThisName = username && algorithm in algorithms && dislikes[searchedName] && dislikes[searchedName].includes(name.candidate)
    const show = username && algorithm in algorithms

    const disable = (rank) => {
        if (rank === 1){
            return (dislikes[searchedName] && dislikes[searchedName].includes(name.candidate))
        }
        else{
            return (likes[searchedName] && likes[searchedName].includes(name.candidate))
        }

        // return(!(ranks[searchedName] && ranks[searchedName].includes(name.candidate)))
        // return(((dislikes[searchedName] && dislikes[searchedName].includes(name.candidate))||(likes[searchedName] && likes[searchedName].includes(name.candidate))))
    }



    const rankResults = (rank) => {
        console.log(likes)
        name.add_rank = rank
        rank > 0 && username ? dispatch(addLikes(searchedName, name.candidate)) : dispatch(addDislikes(searchedName, name.candidate))
        if (algorithm in algorithms) {
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
            // .then(
            //     function (response) {
            //         setName(response.data)
            //     })
              .catch(function (error) {
                console.log(error);
            });
        }
    }

    const removeRankResult = (rank) => {
        // name.add_rank = rank
        name.remove_rank = rank
        console.log(likes)
        rank > 0 && username ? dispatch(removeLikes(searchedName, name.candidate)) : dispatch(removeDislikes(searchedName, name.candidate))
        if (algorithm in algorithms) {
            const rankData = {
                username: username,
                type_name: algorithm,
                selected_name: searchedName,
                remove_rank: name.add_rank,
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
            {showNotUser && <><HandThumbsUpFill color="rgba(54, 105, 35, 1)" style={{marginRight:"3px"}}/><small style={{fontSize:"10px"}}>{name.like}</small>
             <HandThumbsDownFill color="rgba(240, 92, 62, 1)" style={{marginRight:"3px", marginLeft:"8px"}}/><small style={{fontSize:"10px"}}>{-name.dislike}</small></> }
            {/* <LikeButton show={showLikeRank} name={name} rankFunc={rankResults} rank={1} disable={disable(likes)}/>
            <LikeButton show={showDislikeRank} name={name} rankFunc={rankResults} rank={-1} disable={disable(dislikes)}/> */}
            <LikeButton show={show} fill={likedThisName} name={name} rankFunc={rankResults} removeFunc={removeRankResult} rank={1} disable={disable(1)}/>
            <LikeButton show={show} fill={dislikedThisName} name={name} rankFunc={rankResults} removeFunc={removeRankResult} rank={-1} disable={disable(-1)}/>
        </>
    );
}

export default RankInfo;


// onMouseOver={() => getNameInfo(searchedName)}
// disabled={name.add_rank !== 0}