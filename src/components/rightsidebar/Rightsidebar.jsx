/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import './rightsidebar.css'
import assets from '../../assets/assets'
import { logout } from '../../config/FIrebase'
import { AppContext } from '../../context/AppContext'
const Rightsidebar = () => {

  const{chatUser}=useContext(AppContext);
  return chatUser ? (
    <div className="rs">
      <div className="rs-profile">
        <img src={assets.profile_img} alt="profile" />
        <h3>{chatUser.userData.name} <img src={assets.green_dot} alt="green" className='dot' /></h3>
        <p> {chatUser.userData.bio} </p>
      </div>
      <hr className='hr'/>
      <div className="rs-media">
        <p>Media</p>
        <div>
          {/* <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" /> */}
        </div>
      </div>
      <button onClick={()=>logout()}>Logout</button>
    </div>
  )
  :(
    <div className='rs'>
      <button onClick={()=>logout()}>LogOut</button>
    </div>
  )
}

export default Rightsidebar