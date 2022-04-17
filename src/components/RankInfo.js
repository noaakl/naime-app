import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLikes, addDislikes } from "../store/action";
import LikeButton from "./LikeButton";
import { algorithems } from '../global/AlgorithemsConstants'
import axios from "axios";
import { HandThumbsUpFill, HandThumbsDownFill } from 'react-bootstrap-icons';


const RankInfo = ({ searchedName, name, algorithem }) => {
    const dispatch = useDispatch()
    const username = useSelector((state) => state.reduser.username);
    const likes = useSelector((state) => state.reduser.likes);
    const dislikes = useSelector((state) => state.reduser.dislikes);
    const likesNumber = useSelector((state) => state.reduser.likesCount);
    const dislikesNumber = useSelector((state) => state.reduser.dislikesCount);

    const showNotUser = !username && algorithem in algorithems
    const showLikeRank = username && algorithem in algorithems && (!dislikes[searchedName] || (dislikes[searchedName] && !dislikes[searchedName].includes(name.candidate)))
    const showDislikeRank = username && algorithem in algorithems && (!likes[searchedName] || (likes[searchedName] && !likes[searchedName].includes(name.candidate)))

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

    return (
        <>
            {showNotUser && <><HandThumbsUpFill color="rgba(54, 105, 35, 1)" style={{marginRight:"3px"}}/><small style={{fontSize:"10px"}}>{name.like}</small>
            <HandThumbsDownFill color="rgba(240, 92, 62, 1)" style={{marginRight:"3px", marginLeft:"8px"}}/><small style={{fontSize:"10px"}}>{-name.dislike}</small></> }
            <LikeButton show={showLikeRank} name={name} rankFunc={rankResults} rank={1} disable={disable(likes)}/>
            <LikeButton show={showDislikeRank} name={name} rankFunc={rankResults} rank={-1} disable={disable(dislikes)}/>
        </>
    );
}

export default RankInfo;


// onMouseOver={() => getNameInfo(searchedName)}
// disabled={name.add_rank !== 0}