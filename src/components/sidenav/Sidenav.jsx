/* eslint-disable no-unused-vars */
import React from 'react';
import './Sidenav.css'; 
import videocall from '../../icons/videocall.png';
import status from '../../icons/status.png';
import menu from '../../icons/menu.png';
import phonecall from '../../icons/phonecall.png';

const Sidenav = () => {
  return (
    <div className="side-nav">
      <div className="navbar">
        <ul className="nav-list">
          <li className="nav-items">
            <img src={phonecall} alt="phone" />
          </li>
          <li className="nav-items">
            <img src={videocall} alt="videocall" />
          </li>
          <li className="nav-items">
            <img src={status} alt="status" />
          </li>
          <li className="nav-items">
            <img src={menu} alt="menu" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidenav;
