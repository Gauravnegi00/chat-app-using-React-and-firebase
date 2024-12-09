/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import './chat.css';
import Leftsidebar from '../../components/leftsidebar/Leftsidebar';
import Chatbox from '../../components/chatbox/Chatbox';
import Rightsidebar from '../../components/rightsidebar/Rightsidebar';
import Sidenav from '../../components/sidenav/Sidenav';
import { AppContext } from '../../context/AppContext';

const Chat = () => {
  const { chatData, userData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); 
    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className="chat">
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="chat-container">
          <Sidenav />
          <Leftsidebar />
          <Chatbox />
          <Rightsidebar />
        </div>
      )}
    </div>
  );
};

export default Chat;
