import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Styles from '../App.module.scss'
import { Dropdown } from 'react-bootstrap'
import { Download } from 'react-bootstrap-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import PopoverBody from 'react-bootstrap/PopoverBody'

const Api = ({ name }) => {
    const apiKey = useSelector((state) => state.reduser.apiKey);
    const fileName = `naime suggestions for ${name}`
    const [copied, setCopied] = useState(false)
    const [suggestions, setSuggestions] = useState({})

    useEffect(() => {
        getSuggestions()
    }, [name]);

    const getSuggestions = () => {
        if (apiKey) {
            const searchData = {
                "name": name,
                "key": apiKey
            }
            axios({
                method: "GET",
                url: `/api/suggestions`,
                params: searchData
            })
                .then((response) => {
                    setSuggestions(response.data)
                })
        }
    }

    const downloadJson = () => {
        const data = JSON.stringify(suggestions)
        const type = 'application/json'
        return download(data, type)
    }

    const download = (data, type) => {
        let file = new Blob([data], { type: type });
        if (window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(file, fileName);
        else {
            let a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

    const copyJsonURL = () => {
        // const baseURL = `http://127.0.0.1:5000`
        const baseURL = `https://naime.cs.bgu.ac.il`
        const suggestionsAPI = `${baseURL}/api/suggestions?name=${name.toLowerCase()}&key=${apiKey}`
        navigator.clipboard.writeText(suggestionsAPI)
        document.execCommand('copy');
        setCopied(true)
    }

    return (
        <div style={{ display: apiKey ? 'inline' : 'none', }}>


            <Dropdown className={Styles.api} autoClose="outside">
                <Dropdown.Toggle className={Styles.sort} variant="icon" bsPrefix="Button" size="xs" id="dropdown-basic">
                    <Download style={{ marginRight: "15px", marginLeft: "5px", verticalAlign: "super" }} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => downloadJson()}>Download as Json</Dropdown.Item>
                    <OverlayTrigger
                        key="copy"
                        placement={"right"}
                        overlay={
                            <Popover id={`popover-copy`} style={{ display: copied ? '' : 'none', }}>
                                <PopoverBody bsPrefix={Styles.popover}>
                                    copied!
                                </PopoverBody>
                            </Popover>
                        }
                    >
                        <Dropdown.Item onClick={() => copyJsonURL()}>Copy Json URL</Dropdown.Item>
                    </OverlayTrigger>
                </Dropdown.Menu>

            </Dropdown>

        </div>
    )
}
export default Api;
