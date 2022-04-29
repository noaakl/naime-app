import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBFooter } from "mdbreact";
import Styles from "../App.module.scss";
import logo from '../images/logon.png';
import { Github } from 'react-bootstrap-icons';

const Footer = () => {

  return (
    <MDBFooter bgColor='light' className='text-center text-lg-left' id={Styles.footer}>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(129, 138, 127, 0.7)' }}>
        <section>
        <a
            href='#!'
            role='button'
        //   ><Github size={20} style={{margin:"0",display: 'inline-block', color:'black',marginRight:'10px'}}/></a>
          ><img src={logo} alt="Logo" width="21" height="20" style={{ margin:"0",display: 'inline-block', color:'black',marginRight:'10px'}}/></a>
          <small><strong>nAIme</strong> - Name Suggestion Project &copy; 2022</small>
        </section>
      </div>
    </MDBFooter>
  );
}

export default Footer;
