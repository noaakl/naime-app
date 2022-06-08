import React, { useState } from "react";
import Styles from '../App.module.scss'
import { MDBFooter } from "mdbreact";
import naimeLogo from '../images/logon.png';
import { Github, Files } from 'react-bootstrap-icons';
import { Dropdown, Modal, Button } from 'react-bootstrap'
const Footer = () => {

    const [showCiteModal, setShowCiteModal] = useState(false)
    const [copiedAPA, setCopiedAPA] = useState(false)
    const [copiedBibTeX, setCopiedBibTeX] = useState(false)
    const [APA, setAPA] = useState('')
    const [BibTeX, setBibTeX] = useState('')
    const spokenApa = 'Elyashar, A., Puzis, R., & Fire, M. (2021). How does that name sound? Name representation learning using accent-specific speech generation. Knowledge-Based Systems, 227, 107229.‏'
    const spokenBibTeX = `@article{elyashar2021does,
        title={How does that name sound? Name representation learning using accent-specific speech generation},
        author={Elyashar, Aviad and Puzis, Rami and Fire, Michael},
        journal={Knowledge-Based Systems},
        volume={227},
        pages={107229},
        year={2021},
        publisher={Elsevier}
      }`
    const graftApa = 'Elyashar, A., Puzis, R., & Fire, M. (2021). It Runs in the Family: Unsupervised Algorithm for Alternative Name Suggestion Using Digitized Family Trees. IEEE Transactions on Knowledge & Data Engineering, (01), 1-1.‏'
    const graftBibTeX = `@article{elyashar2021runs,
        title={It Runs in the Family: Unsupervised Algorithm for Alternative Name Suggestion Using Digitized Family Trees},
        author={Elyashar, Aviad and Puzis, Rami and Fire, Michael},
        journal={IEEE Transactions on Knowledge \& Data Engineering},
        number={01},
        pages={1--1},
        year={2021},
        publisher={IEEE Computer Society}
      }`

    const openCiteModal = (_APA, _BibTeX) => {
        setShowCiteModal(true)
        setAPA(_APA)
        setBibTeX(_BibTeX)
    }

    const closeCiteModal = () => {
        setShowCiteModal(false)
        setCopiedAPA(false)
        setCopiedBibTeX(false)
    }

    const copyCite = (toCopy, setCopied) => {
        navigator.clipboard.writeText(toCopy)
        document.execCommand('copy');
        setCopied(true)
    }

    const copied = (copy) => {
        return (
            <div
                // style={{
                //     display: copy ? '' : 'none',
                // }}
            >
                {/* <h5 style={{ color: 'green', fontSize: '13px', margin: '5px 15px' }}>{"Copied!"}</h5> */}
                <h5 style={{ color: copy ? 'green' : 'rgba(158, 160, 143, 0.01', fontSize: '12px', margin: '5px 15px' }}>{"Copied!"}</h5>
            </div>
        );
    };

    return (
        <MDBFooter className='text-center text-lg-start text-muted'>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.06)' }}>
                <section className='d-flex justify-content-lg-between p-3 border-bottom'>
                    <div className='me-5 d-none'>
                        <span>
                            <img src={naimeLogo} alt="Logo" width="21" height="20" style={{ margin: "0", display: 'inline-block', color: 'black', marginRight: '10px' }} />
                            <strong>nAIme</strong> - Similar Name Suggestor
                        </span>
                    </div>
                </section>

                <section className=''>
                    <div className='container text-center text-md-start mt-5'>
                        <div className='row mt-3'>
                            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                                <h6 className='fw-bold mb-4'>
                                    <i className='fas fa-gem me-3'></i>nAIme
                                </h6>
                                <p>
                                    Name Search final project in the department of Software and Information Systems Engineering in Ben Gurion University of the Negev, Israel
                                </p>
                            </div>

                            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
                                <h6 style={{ marginLeft: '20px' }} className='text-uppercase fw-bold mb-4'>Products</h6>
                                <p>
                                    <a className='text-reset'
                                        href='https://github.com/noaakl/naime-app'
                                        target="_blank"
                                        rel="noreferrer"
                                        role='button'
                                    ><Github size={20} style={{ margin: "0", display: 'inline-block', color: 'black', marginRight: '10px' }} />
                                        Website
                                    </a>
                                </p>

                                <p>
                                    <a className='text-reset'
                                        href='https://github.com/noaakl/Final_Project_Names'
                                        target="_blank"
                                        rel="noreferrer"
                                        role='button'
                                    ><Github size={20} style={{ margin: "0", display: 'inline-block', color: 'black', marginRight: '10px' }} />
                                        Python Package
                                    </a>
                                </p>

                                <p>
                                    <a className='text-reset'
                                        href='https://github.com/noaakl/Final_Project_Names/tree/main/SiameseNetwork'
                                        target="_blank"
                                        rel="noreferrer"
                                        role='button'
                                    ><Github size={20} style={{ margin: "0", display: 'inline-block', color: 'black', marginRight: '10px' }} />
                                        Research
                                    </a>
                                </p>

                            </div>

                            <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4' >
                                <h6 style={{ marginLeft: '30px' }} className='text-uppercase fw-bold mb-4'>Articles</h6>
                                <Dropdown >
                                    <Dropdown.Toggle variant="link" className='text-reset' bsPrefix="button" id="dropdown-basic" >
                                        <div>
                                            {/* <img src={googleScholarLogo} alt="Logo" width="21" height="20" style={{ margin: "0", display: 'inline-block', color: 'black', marginRight: '10px' }} /> */}
                                            Graft
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => window.open('https://doi.org/10.1109/TKDE.2021.3096670', '_blank').focus()}>
                                            Go to Article
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => { openCiteModal(graftApa, graftBibTeX) }}>Cite</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>



                                <Dropdown style={{ marginRight: '30px' }}>
                                    <Dropdown.Toggle bsPrefix="button" variant="link" className='text-reset' id="dropdown-basic" >
                                        <div>
                                            {/* <img src={googleScholarLogo} alt="Logo" width="21" height="20" style={{ color: 'black', marginRight: '10px' }} /> */}
                                            SpokenName2Vec
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => window.open('https://doi.org/10.1016/j.knosys.2021.107229', '_blank').focus()}>
                                            Go to Article
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => { openCiteModal(spokenApa, spokenBibTeX) }}>Cite</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                                <h6 style={{ marginLeft: '40px' }} className='text-uppercase fw-bold mb-4'>Contact</h6>
                                <p style={{ marginLeft: '10px' }}>
                                    {/* //TODO: change */}
                                    <i className='fas fa-envelope me-3'></i>
                                    aviade@post.bgu.ac.il
                                </p>
                                <p style={{ marginLeft: '10px' }}>
                                    <i className='fas fa-phone me-3'></i> +972747795152
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    © 2022 Copyright:
                    <a style={{ marginLeft: '5px' }} className='text-reset fw-bold' href='https://naime.cs.bgu.ac.il'>
                        nAIme.cs.bgu.ac.il
                    </a>
                </div>
            </div>

            <Modal size='xl' show={showCiteModal} onHide={() => closeCiteModal()}>

                <Modal.Header className={Styles.modal_header} closeButton>
                    <Modal.Title>Cite</Modal.Title>
                </Modal.Header>
                <section className='d-flex border-bottom'>
                    <Modal.Body className={Styles.accordion_modal}>
                        <ul className={Styles.cite_item}>
                            <li className={Styles.cite_string_item} key='APA'>
                                {APA}
                            </li>
                        </ul>
                    </Modal.Body>
                    <Modal.Footer className={Styles.accordion_modal}>
                        <ul className={Styles.cite_item}>
                            <li className={Styles.accordion_item_name} key='APA'>
                                <div onClick={() => copyCite(APA, setCopiedAPA)}>
                                APA
                                {/* <OverlayTrigger
                                    key="copy"
                                    placement={"right"}
                                    overlay={
                                        <Popover id={`popover-copy`} style={{ display: copiedAPA ? '' : 'none', }}>
                                            <PopoverBody bsPrefix={Styles.popover}>
                                                copied!
                                            </PopoverBody>
                                        </Popover>
                                    }
                                > */}
                                    <Files as='button' size={20} style={{ margin: "0px 0px 5px 5px", display: 'inline-block', color: 'black'}} />
                                    </div>
                                {/* </OverlayTrigger> */}
                            </li>
                                {copied(copiedAPA)}
                        </ul>
                    </Modal.Footer>
                </section>
                <section className='d-flex border-top '>
                    <Modal.Body className={Styles.accordion_modal}>
                        <ul className={Styles.cite_item}>
                            <li className={Styles.cite_string_item} key='BibTeX'>
                                {BibTeX}
                            </li>
                        </ul>
                    </Modal.Body>
                    <Modal.Footer className={Styles.accordion_modal}>
                        <ul className={Styles.cite_item}>
                            <li className={Styles.accordion_item_name} key='BibTeX'>
                                BibTeX
                                {/* <OverlayTrigger
                                    key="copy"
                                    placement={"right"}
                                    overlay={
                                        <Popover id={`popover-copy`} style={{ display: copiedBibTeX ? '' : 'none', }}>
                                            <PopoverBody>
                                                copied!
                                            </PopoverBody>
                                        </Popover>
                                    }
                                > */}
                                    <Files as='button' onClick={() => copyCite(BibTeX, setCopiedBibTeX)} size={20} style={{ margin: "0px 0px 5px 5px", display: 'inline-block', color: 'black'}} />
                                {/* </OverlayTrigger> */}

                            </li>
                            {copied(copiedBibTeX)}
                        </ul>
                    </Modal.Footer>
                </section>
                <Modal.Footer className={Styles.accordion_modal}>
                    <Button variant="secondary" onClick={() => closeCiteModal()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </MDBFooter>
    );
}
export default Footer;