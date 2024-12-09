/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./login.css";
import { signup , login} from "../../config/FIrebase";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (currentState === "Sign Up") {
      signup(userName, email, password);
      // alert("Account created successfully!");  
    }else{
      login(email,password);
    }
  };

  return (
    <div className="login">
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currentState}</h2>

       
        {currentState === "Sign Up" && (
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            name="username"
            placeholder="Username"
            className="form-input"
            required
          />
        )}

        
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          placeholder="Email Address"
          className="form-input"
          required
        />

       
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          placeholder="Password"
          className="form-input"
          required
        />

        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Login Now"}
        </button>

        <div className="login-term">
          <input type="checkbox" required />
          <p>Agree to the terms of use and privacy policy.</p>
        </div>

        
        <div className="login-toggle">
          {currentState === "Sign Up" ? (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrentState("Login")}>Click here</span>
            </p>
          ) : (
            <p>
              Don&apos;t have an account?{" "}
              <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
