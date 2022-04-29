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
    {/* <MDBFooter bgColor='light' className='text-center text-lg-left' style={{ flex:"none"}}>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter> */}

    </PersistGate>
    </Provider>
    // </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));