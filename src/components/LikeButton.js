import React from "react";
import Styles from '../App.module.scss'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import PopoverBody from 'react-bootstrap/PopoverBody'
import ToggleButton from 'react-bootstrap/ToggleButton'
import { HandThumbsUpFill, HandThumbsDownFill } from 'react-bootstrap-icons';

const LikeButton = ({ show, name, rankFunc, rank, disable }) => {
    const like = rank === 1

    return (
        <>
            {show && <OverlayTrigger
                // trigger="hover"
                className={disable ? Styles.rank_button : Styles.disable_rank_button}
                key="like"
                placement={"right"}
                overlay={!disable ? (
                    <Popover id={`popover-rank-info`} >
                        <PopoverBody bsPrefix={Styles.popover}>
                            Liked by {name.add_rank>0 ? `you and ${name.like}` : name.like} others{'\n'}
                            DisLiked by {name.add_rank<0 ? `you and ${-name.dislike}` : -name.dislike} others
                        </PopoverBody>
                    </Popover>) : (<></>)
                }
            >
                <ToggleButton variant="text" className={disable ? Styles.rank_button : Styles.disable_rank_button}
                    onClick={() => { rankFunc(rank) }}
                >
                    {like ? <HandThumbsUpFill color="rgba(54, 105, 35, 1)" style={{marginRight:"10px"}} /> : <HandThumbsDownFill color="rgba(240, 92, 62, 1)" />}
                </ToggleButton>
            </OverlayTrigger>}
        </>
    );
}

export default LikeButton;