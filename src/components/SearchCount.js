import Styles from '../App.module.scss'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import PopoverBody from 'react-bootstrap/PopoverBody'
import { useState } from 'react'
import axios from "axios";
import { InfoCircleFill } from 'react-bootstrap-icons';

const SearchCount = ({ searchedName }) => {
    const [count, setCount] = useState(0);

    const getNameInfo = (searchVal) => {
        axios({
          method: "GET",
          url: `/searchList?name=${searchVal}`
        })
        .then((response) => {
            setCount(response.data.count)
        })}

    return (
        <>
            <OverlayTrigger 
                trigger="click"
                key="info"
                placement={"right"}
                overlay={
                    <Popover id={`popover-info`} >
                        <PopoverBody bsPrefix={Styles.popover}>
                            The name <strong>'{searchedName}'</strong>{'\n'} was searched <strong>{count}</strong> times
                        </PopoverBody>
                    </Popover>
                }
            >
                <InfoCircleFill onClick={() => getNameInfo(searchedName)} className={Styles.info_icon} />
                {/* <svg onClick={() => getNameInfo(searchedName)} className={Styles.info_icon} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48" >
                    <path fill="#F27054" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#fff" d="M22 22h4v11h-4V22zM26.5 16.5c0 1.379-1.121 2.5-2.5 2.5s-2.5-1.121-2.5-2.5S22.621 14 24 14 26.5 15.121 26.5 16.5z"></path>
                </svg> */}
            </OverlayTrigger>
        </>
    );
}

export default SearchCount;

