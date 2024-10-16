/* eslint-disable no-unused-vars */
import React from 'react'
import './chat.css';
import Leftsidebar from '../../components/leftsidebar/Leftsidebar';
import Chatbox from '../../components/chatbox/Chatbox';
import Rightsidebar from '../../components/rightsidebar/Rightsidebar';
import Sidenav from '../../components/sidenav/Sidenav';
const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-container">
        <Sidenav/>
        {/* <Sidenav/> */}
        <Leftsidebar/>
        <Chatbox/>
        <Rightsidebar/>
      </div>
    </div>
  )
}

export default Chat