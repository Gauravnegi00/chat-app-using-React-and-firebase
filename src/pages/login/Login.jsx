/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './login.css';
import assets from '../../assets/assets';

// Import signup and login from firebase.js ⬇️
import { signup, login } from '../../config/firebase';

const Login = () => {
    const [currentstate, setcurrentstate] = useState("Sign Up");

    // Create state variables to store username, email, and password
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onsubmitHandler = (event) => {
        event.preventDefault();
        if (currentstate === "Sign Up") {
            signup(userName, email, password);
        } else {
            login(email, password);
        }
    };

    return (
        <div className='login'>
            <img src={assets.logo_big} alt="logo" />
            <form onSubmit={onsubmitHandler} className='login-form'>
                <h2>{currentstate}</h2>
                {currentstate === "Sign Up" && (
                    <input
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                        type='text'
                        placeholder='Username'
                        className='form-input'
                        required
                    />
                )}
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type='email'
                    placeholder='Email Address'
                    className='form-input'
                    required
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type='password'
                    placeholder='Password'
                    className='form-input'
                    required
                />

                <button type='submit'>
                    {currentstate === "Sign Up" ? "Create account" : "Login now"}
                </button>

                <div className='login-term'>
                    <input type="checkbox" />
                    <p>Agree to the terms of use and privacy policy.</p>
                </div>

                <div className="login-frogot">
                    {currentstate === "Sign Up" ? (
                        <p className="login-toggel">
                            Already have an account?{" "}
                            <span onClick={() => setcurrentstate("Log In")}>Click here</span>
                        </p>
                    ) : (
                        <p className="login-toggel">
                            Need an account?{" "}
                            <span onClick={() => setcurrentstate("Sign Up")}>Click here</span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;
