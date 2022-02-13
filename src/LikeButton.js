import React from "react";
import Styles from './App.module.scss'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import PopoverBody from 'react-bootstrap/PopoverBody'
import { HandThumbsUpFill, HandThumbsDownFill, InfoSquare } from 'react-bootstrap-icons';
import ToggleButton from 'react-bootstrap/ToggleButton'

const LikeButton = ({ show, name, rankFunc, rank }) => {
    const disable = name.add_rank === 0
    const like = rank == 1

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
                            DisLiked by {name.add_rank<0 ? `you and ${name.like}` : name.like} others
                        </PopoverBody>
                    </Popover>) : (<></>)
                }
            >
                <ToggleButton variant="text" className={disable ? Styles.rank_button : Styles.disable_rank_button}
                    onClick={() => { rankFunc(rank) }}
                >
                    {like ? <HandThumbsUpFill color="rgba(54, 105, 35, 1)" /> : <HandThumbsDownFill color="rgba(240, 92, 62, 1)" />}
                </ToggleButton>
            </OverlayTrigger>}
        </>
    );
}

export default LikeButton;