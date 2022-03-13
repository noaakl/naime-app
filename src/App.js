import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import store from './store/store'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserInfo from "./components/UserInfo";
import SingUp from "./components/SignUp";
// import { useState } from 'react';
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar";



export default function App() {
  // const [showAbout, setShowAbout] = useState(false);
  // const handleAbout = () => setShowAbout(!showAbout);
  return (
    <Provider store={store}>
    <BrowserRouter>
    <NavBar/>
    
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/userInfo" element={<UserInfo />}></Route>
        <Route path="/signUp" element={<SingUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));