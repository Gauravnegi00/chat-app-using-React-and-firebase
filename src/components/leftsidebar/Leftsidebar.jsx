/* eslint-disable no-unused-vars */
import React from "react";
import "./leftsidebar.css";
import assets from "../../assets/assets";
const Leftsidebar = () => {
  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="logo" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input type="text" placeholder="search here.." />
        </div>
      </div>
      <div className="ls-list">
        {Array(12).fill("").map((items, index) => (
            <div className="friends" key={index}>
              <img src={assets.profile_img} alt="profile" />
              <div>
                <p>Aryan</p>
                <span>Hello, how are you</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Leftsidebar;
