/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './profileupdate.css';
import assets from '../../assets/assets';
const Profileupdate = () => {

   const[img,setimg]=useState(false)
  return (
    <div className="profile">
      <div className="profile-contianer">
        <form>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input onChange={(e)=>setimg(e.target.files[0])} type="file" name="" id="avatar"  accept='.png , .jpg, .jpeg' hidden/>
            <img src={img? URL.createObjectURL(img) : assets.avatar_icon} alt="avatar" />
            upload profile image
          </label>
          <input type="text" placeholder='your name' required />
          <textarea placeholder='write profile bio'  required></textarea>
          <button type='submit'>save</button>
        </form>
        <img src={ img? URL.createObjectURL(img): assets.logo_icon} className='profile-pic' alt="" />
      </div>
    </div>
  )
}

export default Profileupdate