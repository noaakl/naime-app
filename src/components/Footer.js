import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBFooter } from "mdbreact";
import Styles from "../App.module.scss";
import naimeLogo from '../images/logon.png';
import googleScholarLogo from '../images/google-scholar.png';
import { Github } from 'react-bootstrap-icons';

const Footer = () => {

    return (
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
            {/* <br/>
            <br/>
            <br/> */}
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.06)' }}>
            <section className='d-flex justify-content-center justify-content-lg-between p-3 border-bottom'>
                <div className='me-5 d-none d-lg-block'>
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
                                Part of our Name Search Final Project of the Software and Information Systems Engeneering in BGU university in Israel

                            </p>
                        </div>

                        <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
                            <h6 style={{ marginLeft: '20px' }} className='text-uppercase fw-bold mb-4'>Products</h6>
                            <p>
                                <a className='text-reset'
                                    href='https://github.com/noaakl/naime-app'
                                    target="_blank"
                                    role='button'
                                ><Github size={20} style={{ margin: "0", display: 'inline-block', color: 'black', marginRight: '10px' }} />
                                Website
                                </a>
                            </p>

                            <p>
                            <a className='text-reset'
                                    href='https://github.com/noaakl/Final_Project_Names'
                                    target="_blank"
                                    role='button'
                                ><Github size={20} style={{ margin: "0", display: 'inline-block', color: 'black', marginRight: '10px' }} />
                                Python Package
                                </a>
                            </p>

                            <p>
                            <a className='text-reset'
                                    href='https://github.com/noaakl/Final_Project_Names/tree/main/SiameseNetwork'
                                    target="_blank"
                                    role='button'
                                ><Github size={20} style={{ margin: "0", display: 'inline-block', color: 'black', marginRight: '10px' }} />
                                Research
                                </a>
                            </p>

                        </div>

                        <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
                            {/* <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6> */}
                            <h6 style={{ marginLeft: '20px' }} className='text-uppercase fw-bold mb-4'>Articles</h6>
                            <p>
                            <a className='text-reset'
                                    href='https://scholar.google.co.il/citations?view_op=view_citation&hl=en&user=CPE9YOkAAAAJ&citation_for_view=CPE9YOkAAAAJ:kNdYIx-mwKoC' //TODO: change ref
                                    target="_blank"
                                    role='button'
                                >
                        <img src={googleScholarLogo} alt="Logo" width="21" height="20" style={{ margin: "0", display: 'inline-block', color: 'black', marginRight: '10px' }} />
                                Graft
                                </a>
                            </p>
                            <p>
                            <a className='text-reset'
                                    href='https://scholar.google.co.il/citations?view_op=view_citation&hl=en&user=CPE9YOkAAAAJ&citation_for_view=CPE9YOkAAAAJ:3fE2CSJIrl8C' //TODO: change ref
                                    target="_blank"
                                    role='button'
                                >
                        <img src={googleScholarLogo} alt="Logo" width="21" height="20" style={{ margin: "0", display: 'inline-block', color: 'black', marginRight: '10px' }} />
                                SpokenName2Vec
                                </a>
                            </p>
                        </div>

                        <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
                            <h6 style={{ marginLeft: '30px' }} className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                <i className='fas fa-home me-3'></i> P.O.B. 653 Beer-Sheva, Israel
                            </p>
                            <p>
                            {/* //TODO: change */}
                                <i className='fas fa-envelope me-3'></i> 
                                info@example.com
                            </p>
                            <p>
                                <i className='fas fa-phone me-3'></i> + 972 8 6461111
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
            {/* <strong>nAIme</strong> - Name Suggestion Project &copy; 2022 */}
            {/* <br/> */}
                © 2022 Copyright:
                {/* //TODO: change */}
                <a style={{ marginLeft: '5px' }} className='text-reset fw-bold' href='https://naime.cs.bgu.ac.il'>
                nAIme.cs.bgu.ac.il 
                </a>
            </div>
            </div>
        </MDBFooter>
    );
}







//         <MDBFooter bgColor='light' className={Styles.footerWrapper} id={Styles.footer}>
//             <div className='text-center p-3' style={{ backgroundColor: 'rgba(129, 138, 127, 0.7)' }}>
//                 <section >
//                     <img src={Logo} alt="Logo" width="21" height="20" style={{ margin: "0", display: 'inline-block', color: 'black', marginRight: '10px' }} />
//                     <small>
//                         <strong>nAIme</strong> - Name Suggestion Project &copy; 2022
//                         <br />
//                         <br />
//                     </small>
//                 </section>
//                 <span>

//                 <section className={Styles.leftFooter}>
//                     <small>
//                         Part of our Name Search Final Project of the Software and Information Systems Engeneering in BGU university in Insrael
//                         <br />
//                         <strong>Students:</strong> Noaa Kless, Guy Shimony, Tal Meridor
//                         <br />
//                         <strong>Mentors:</strong> Mr Aviad Elishar, Dr Micky Fier, Dr Rami Fuzis
//                     </small>
//                 </section>

//                 <section className={Styles.rightFooter}>
//                     <small>
//                         Part of our Name Search Final Project of the Software and Information Systems Engeneering in BGU university in Insrael
//                         <br />
//                         <strong>Students:</strong> Noaa Kless, Guy Shimony, Tal Meridor
//                         <br />
//                         <strong>Mentors:</strong> Mr Aviad Elyashar, Dr Micky Fier, Dr Rami Fuzis
//                     </small>
//                 </section>

//                 </span>
//             </div>
//         </MDBFooter>
//     );
// }

export default Footer;



{/* <section>
<a
    href='#!'
    role='button'
  ><Github size={20} style={{margin:"0",display: 'inline-block', color:'black',marginRight:'10px'}}/></a>
  <small><strong>nAIme</strong> - Name Suggestion Project &copy; 2022</small></section> */}