/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Corrected BrowserRoutes to BrowserRouter
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";
import Profileupdate from "./pages/profileupdate/Profileupdate";

const App = () => {
  return (
    <>
      <BrowserRouter> {/* Corrected BrowserRoutes to BrowserRouter */}
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
