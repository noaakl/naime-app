import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import {store, persistor} from './store/store'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserInfo from "./components/UserInfo";
import SingUp from "./components/SignUp";
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar";
import { PersistGate } from 'redux-persist/integration/react'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import Styles from "./App.module.scss";
import { Github ,Google ,Pypi } from 'react-bootstrap-icons';

export default function App() {
  return (
    // <div className={Styles.search_page}>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/userInfo" element={<UserInfo />}></Route>
        <Route path="/signUp" element={<SingUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
    <MDBFooter bgColor='light' className='text-center text-lg-left' id={Styles.footer}>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(129, 138, 127, 0.7)' }}>
        <section>
        <a
            href='#!'
            role='button'
          ><Github size={20} style={{margin:"0",display: 'inline-block', color:'black',marginRight:'10px'}}/></a>
          <small>Name Suggestion Project &copy; 2022</small>
        </section>
      </div>
    </MDBFooter>

    </PersistGate>
    </Provider>
    // </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));