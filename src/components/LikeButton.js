import React from "react";
import Styles from '../App.module.scss'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import PopoverBody from 'react-bootstrap/PopoverBody'
import ToggleButton from 'react-bootstrap/ToggleButton'
import { Button } from 'react-bootstrap'

import { HandThumbsUpFill, HandThumbsDownFill,HandThumbsUp, HandThumbsDown } from 'react-bootstrap-icons';

const LikeButton = ({ show, name, rankFunc, fill, rank, disable }) => {
    const like = rank === 1
    const disables = disable
    console.log(rank)
    console.log(name.candidate)
    console.log(disables)
    return (
        <>{show && (
        <Button  variant="text"  className={Styles.rank_button} disabled={disables} onClick={() => { rankFunc(rank) }} style={{opacity:"1"}} >
                 {like  && fill ?<> <HandThumbsUpFill color="rgba(54, 105, 35, 1)" style={{marginRight:"3px"}}/><small style={{fontSize:"10px"}}>{name.like}</small></>:<></>}
                 {like && !fill ? <><HandThumbsUp color="rgba(54, 105, 35, 1)" style={{marginRight:"3px"}}/><small style={{fontSize:"10px"}}>{name.like}</small></>:<></>}
                
                 {!like  && fill ? <><HandThumbsDownFill color="rgba(240, 92, 62, 1)" style={{marginRight:"3px"}}/><small style={{fontSize:"10px"}}>{-name.dislike}</small></>:<></>}
                 {!like && !fill ?<> <HandThumbsDown color="rgba(240, 92, 62, 1)" style={{marginRight:"3px"}}/><small style={{fontSize:"10px"}}>{-name.dislike}</small></>:<></>}

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