import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Styles from '../App.module.scss'
import { Dropdown } from 'react-bootstrap'
import { Download } from 'react-bootstrap-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import PopoverBody from 'react-bootstrap/PopoverBody'
import ToggleButton from 'react-bootstrap/ToggleButton'

const Api = ({ name }) => {
    const apiKey = useSelector((state) => state.reduser.api_key);
    const fileName = `naime suggestions for ${name}`
    // const [fileName, setfileName] = useState(`naime suggestions for ${name}`)
    const [copied, setCopied] = useState(false)
    const [suggestions, setSuggestions] = useState({})
    const [csvData, setCsvData] = useState("")
    // const hat = require('hat');
    // const apiKey = hat();
    // const textAreaRef = useRef(null);

    useEffect(() => {
        getSuggestions()
        ConvertSuggestionsToCSV()
    }, [name]);

    const getSuggestions = () => {
        axios({
            method: "GET",
            url: `/api/suggestions?name=${name}&key=${apiKey}`
        })
            .then((response) => {
                setSuggestions(response.data)
            })
    }

    const ConvertSuggestionsToCSV = () => {
        let json2csv = require("json2csv");
        setCsvData(json2csv.parse(suggestions, { fields: Object.keys(suggestions) }))


    }

    const downloadCSV = () => {
        const data = csvData
        console.log(data)
        const type = 'text/csv'
        return download(data, type)
    }

    const downloadJson = () => {
        const data = JSON.stringify(suggestions)
        const type = 'application/json'
        return download(data, type)
    }

    const download = (data, type) => {
        var file = new Blob([data], { type: type });
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, fileName);
        else { // Others
            var a = document.createElement("a"),
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
        const baseURL = `http://127.0.0.1:5000`
        const suggestionsAPI = `${baseURL}/api/suggestions?name=${name.toLowerCase()}&key=${apiKey}`
        navigator.clipboard.writeText(suggestionsAPI)
        document.execCommand('copy');
        setCopied(true)
    }

    return (
        <div style={{ display: apiKey ? '' : 'none', }}>


            <Dropdown className={Styles.api} >
                <Dropdown.Toggle className={Styles.sort} variant="icon" bsPrefix="Button" size="xs" id="dropdown-basic">
                <OverlayTrigger
                key="copy"
                placement={"right"}
                overlay={
                    <Popover id={`popover-copy`} >
                        {copied && <PopoverBody bsPrefix={Styles.popover}>
                            copied!
                        </PopoverBody>}
                    </Popover>
                }
            >
                    <Download style={{ marginRight: "15px", marginLeft: "5px" }}>

                    </Download>
                    </OverlayTrigger>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {/* <Dropdown.Item onClick={()=>downloadCSV()}>Download as CSV</Dropdown.Item> */}
                    <Dropdown.Item onClick={() => downloadJson()}>Download as Json</Dropdown.Item>
                    <Dropdown.Item onClick={() => copyJsonURL()}>Copy Json URL </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        </div>
    )
}
export default Api;
