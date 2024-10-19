/* eslint-disable no-unused-vars */
import React from 'react'
import './rightsidebar.css'
import assets from '../../assets/assets'
import { logout } from '../../config/firebase'
const Rightsidebar = () => {
  return (
    <div className="rs">
      <div className="rs-profile">
        <img src={assets.profile_img} alt="profile" />
        <h3>Aryan <img src={assets.green_dot} alt="green" className='dot' /></h3>
        <p> Hey There I am Aryan using chat app </p>
      </div>
      <hr className='hr'/>
      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
        </div>
      </div>
      <button onClick={()=>{logout()}}>Logout</button>
    </div>
  )
}

export default Rightsidebar