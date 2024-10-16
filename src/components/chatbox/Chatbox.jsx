/* eslint-disable no-unused-vars */
import React from 'react'
import './chatbox.css'
import assets from '../../assets/assets'
const Chatbox = () => {
  return (
    <div className="chat-box">
      <div className="chat-user">
        <img src={assets.profile_img} alt="profile" />
        <p>Aryan <img src={assets.green_dot} className='dot' alt="" /></p>
        <img src={assets.help_icon} alt=""  className='help'/>
      </div>
      <div className="chat-msg">
        <div className="s-msg">
          <p className="msg">Lorem ipsum dolor sit amet.</p>
          <div>
            <img src={assets.profile_img} alt="profile" />
            <p>2:30 PM</p>
          </div>
        </div>
        <div className="s-msg">
          <img src={assets.pic1} alt="" className='msg-img' />
          <div>
            <img src={assets.profile_img} alt="profile"  />
            <p>2:30 PM</p>
          </div>
        </div>
        <div className="r-msg">
          <p className="msg">Lorem ipsum dolor sit amet.</p>
          <div>
            <img src={assets.profile_img}  alt="profile" className='' />
            <p>2:30 PM</p>
          </div>
        </div>
      </div>
      <div className="chat-input">
        <input type="text" placeholder='send a message' />
        <input type="file" id='image' accept='image/png, image/jpg' hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="gallary" />
        </label>
        <img src= {assets.send_button} alt="send" />
      </div>
    </div>
  )
}

export default Chatbox