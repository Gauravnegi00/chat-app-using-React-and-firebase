/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import Profileupdate from "./pages/profileupdate/Profileupdate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { AppContext } from "./context/Appcontext";

const AuthChecker = () => {
  const navigate = useNavigate();
  const {loadUserData} =useContext(AppContext)

  useEffect(() => {
    // onAuthStateChanged is a Firebase Authentication listener that monitors changes in the user's 
    // authentication state (whether the user is logged in or logged out).
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate('/chat');
        // console.log(user);
        await loadUserData(user.uid);
      }
      else{
        navigate('/');
      }
    });
  }, [navigate]);

  return null; // This component does not render any UI
};

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <AuthChecker /> {/* This will handle the navigation based on auth state */}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/profileupdate' element={<Profileupdate />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
