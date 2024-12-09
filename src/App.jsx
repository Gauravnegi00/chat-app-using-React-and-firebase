/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import Profileupdate from "./pages/profileupdate/Profileupdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/FIrebase";
import { AppContext } from "./context/AppContext";

const App = () => {
const navigate=useNavigate();
const {loadUserData}=useContext(AppContext)

  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{
      if(user){
        navigate('/chat')
        await loadUserData(user.uid);
      }else{
        navigate('/');
      }
    })
  },[])
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/update" element={<Profileupdate />} />
      </Routes>
    </>
  );
};

export default App;
