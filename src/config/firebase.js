/* eslint-disable no-unused-vars */

import { initializeApp } from "firebase/app";
import {getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {doc, getFirestore, setDoc} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";


// The firebaseConfig object contains all the necessary credentials to connect your app with Firebase. This includes:
// apiKey: Authentication key to interact with Firebase services.
// authDomain, projectId, storageBucket: Identifiers for your Firebase project.
// messagingSenderId and appId: Used for Firebase messaging and app identification.

const firebaseConfig = {
  apiKey: "AIzaSyB_bPv-5zA8qDW9pfNqp7OuYyJpbmUaBl4",
  authDomain: "chat-app-dcf8c.firebaseapp.com",
  projectId: "chat-app-dcf8c",
  storageBucket: "chat-app-dcf8c.appspot.com",
  messagingSenderId: "1033397069777",
  appId: "1:1033397069777:web:8f1c94fa7deea9842222f0"
  
};

// initializeApp(firebaseConfig): Initializes Firebase with the configuration provided.
// getAuth(app): Retrieves the Firebase authentication instance for handling user authentication.
// getFirestore(app): Retrieves the Firestore database instance for storing and retrieving user data.

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);


const signup= async(username ,email,password)=>{
  try {
    const res=await  createUserWithEmailAndPassword(auth,email,password);
    const user=res.user;
    // setDoc(doc(db, "users", user.uid), {...}): Stores the new user's additional information 
    // (username, bio, etc.) in the Firestore database in a collection called users.
    await setDoc(doc(db,"users",user.uid),{
      id:user.uid,
      // Saved in lowercase.
      username:username.toLowerCase(),
      email,
      name:"",
      avatar:"",
      bio:"Hey,There i am using chat app",
      // lastSeen: Records the current time when the user is registered.
      lastSeen:Date.now()

    })
    await setDoc(doc(db,"chats",user.uid),{
      chatData:[]
    }
  )
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
    
}

// signInWithEmailAndPassword(auth, email, password): Logs the user in with the provided email
//  and password using Firebase Authentication.

const login=async(email,password)=>{
  try {
    await signInWithEmailAndPassword(auth,email,password);
    
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout=async()=>{
   
   try {
    await signOut(auth)
    
  } catch (error) {
    console.error(error);
    // for better toast Messages;
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}
export {signup,login,logout,auth,db}
