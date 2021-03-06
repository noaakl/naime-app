import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import {store} from './store/store'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserInfo from "./components/UserInfo";
import SingUp from "./components/SignUp";
import Login from "./components/Login";
import About from "./components/About";
import AlgorithmsInfo from "./components/AlgorithmsInfo";
import UserFeedback from "./components/Feedback";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
// import { PersistGate } from 'redux-persist/integration/react'

export default function App() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <BrowserRouter>
    <NavBar/>
    <UserFeedback/>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/search/:name" element={<Home />}></Route>
      <Route path="/userInfo" element={<UserInfo />}></Route>
      <Route path="/signUp" element={<SingUp />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/AlgorithmsInfo" element={<AlgorithmsInfo />}></Route>
    </Routes>
    </BrowserRouter>
    <Footer/>
    {/* </PersistGate> */}
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));