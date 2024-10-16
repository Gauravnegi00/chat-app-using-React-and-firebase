/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './login.css';
import assets from '../../assets/assets';
const Login = () => {
    const [currentstate, setcurrentstate]=useState("Sign Up");
  return (
    <div className='login'>
        <img src={assets.logo_big} alt="logo" />
        <form className='login-form'>
            <h2>{currentstate}</h2>
            {currentstate ==="Sign Up" ?<input type='text' placeholder='username' className='form-input' required/>: null}
            <input type='email' placeholder='Email Address' className='form-input' required/>
            <input type='password' placeholder='password' className='form-input' required/>

            <button type='submit'>{currentstate==="Sign Up" ? "Create account" : "Login now" }</button>

            <div className='login-term'>
                <input type="checkbox" />
                <p>Agree to the terms of use a privacy policy.</p>
            </div>


            <div className="login-frogot">
                {
                    currentstate==="Sign Up" ? <p className="login-toggel">Already have an account <span onClick={()=>
                        setcurrentstate("login")
                    }>click here</span></p> :<p className="login-toggel">Create an account <span onClick={()=>
                        setcurrentstate("Sign up")
                    }>click here</span></p>
                }
                
                
            </div>
        </form>
    </div>
  )
}

export default Login