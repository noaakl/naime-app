import React from "react";
import Styles from '../App.module.scss'
import { Button } from 'react-bootstrap'
import { useState, useEffect } from "react";
import { HandThumbsUpFill, HandThumbsDownFill, HandThumbsUp, HandThumbsDown } from 'react-bootstrap-icons';

const LikeButton = ({ show, name, rankFunc, removeFunc, fill, rank, disable, rankLikes, rankDislikes }) => {
    const like = rank === 1
    const disables = disable
    const fill_test = fill
    const [filled, setFilled] = useState(fill)
    const [likesCount, setLikesCount] = useState(rankLikes)
    const [dislikesCount, setDislikesCount] = useState(rankDislikes)

    useEffect(() => {
        setLikesCount(rankLikes)
        setDislikesCount(rankDislikes)
    }, [rankLikes, rankDislikes]);

    const rankfun = () => {
        if (!filled) {
            rankFunc(rank)
            if (like)
                setLikesCount(likesCount + 1)
            else
                setDislikesCount(dislikesCount + 1)
        }
        else {
            removeFunc(rank)
            if (like)
                setLikesCount(likesCount - 1)
            else
                setDislikesCount(dislikesCount - 1)
        }
        setFilled(!filled)
    }

    return (

        <>{show && (
            <Button variant="text" className={Styles.rank_button} disabled={disables} onClick={() => { rankfun() }}  >
                {like && fill_test ? <> <HandThumbsUpFill color="rgba(54, 105, 35, 1)" style={{ marginRight: "3px" }} /><small style={{ fontSize: "10px" }}>{likesCount}</small></> : <></>}
                {like && !fill_test ? <><HandThumbsUp color="rgba(54, 105, 35, 1)" style={{ marginRight: "3px" }} /><small style={{ fontSize: "10px" }}>{likesCount}</small></> : <></>}

                {!like && fill_test ? <><HandThumbsDownFill color="rgba(240, 92, 62, 1)" style={{ marginRight: "3px" }} /><small style={{ fontSize: "10px" }}>{dislikesCount}</small></> : <></>}
                {!like && !fill_test ? <> <HandThumbsDown color="rgba(240, 92, 62, 1)" style={{ marginRight: "3px" }} /><small style={{ fontSize: "10px" }}>{dislikesCount}</small></> : <></>}

            </Button>)}
        </>
        // <>
        //     {show && <OverlayTrigger
        //         // trigger="hover"
        //         className={disable ? Styles.rank_button : Styles.disable_rank_button}
        //         key="like"
        //         placement={"right"}
        //         overlay={!disable ? (
        //             <Popover id={`popover-rank-info`} >
        //                 <PopoverBody bsPrefix={Styles.popover}>
        //                     Liked by {name.add_rank>0 ? `you and ${name.like}` : name.like} others{'\n'}
        //                     DisLiked by {name.add_rank<0 ? `you and ${-name.dislike}` : -name.dislike} others
        //                 </PopoverBody>
        //             </Popover>) : (<></>)
        //         }
        //     >
        //         <ToggleButton variant="text" className={disable ? Styles.rank_button : Styles.disable_rank_button}
        //             onClick={() => { rankFunc(rank) }}
        //         >
        //         {like  && fill ?<> <HandThumbsUpFill color="rgba(54, 105, 35, 1)" style={{marginRight:"3px"}}/></>:<></>}
        //         {like && !fill ? <><HandThumbsUp color="rgba(54, 105, 35, 1)" style={{marginRight:"3px"}}/></>:<></>}

        //         {!like  && fill ? <><HandThumbsDownFill color="rgba(240, 92, 62, 1)" style={{marginRight:"3px"}}/></>:<></>}
        //         {!like && !fill ?<> <HandThumbsDown color="rgba(240, 92, 62, 1)" style={{marginRight:"3px"}}/></>:<></>}
        //         </ToggleButton>
        //     </OverlayTrigger>}
        // </>
    );
}

export default LikeButton;