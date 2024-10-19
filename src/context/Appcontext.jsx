/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

// Create the context
export const AppContext = createContext();
const navigate =useNavigate;
const AppContextProvider = (props) => {
    // Define any state or functions you want to share globally
    const [userData, setUserData] = useState(null);
    const [chatData, setchatdata] = useState(null);

    const loadUserData=async(uid)=>{
        try {
            const userRef=doc(db,'users',uid);
            const userSnap=await getDoc(userRef);
            // console.log(userSnap);
            const userData=userSnap.data();
            setUserData(userData);
            // console.log(userData);

            if(userData.avatar && userData.name){
                navigate('/chat');
            }else{
                navigate('/Profileupdate');
            }
            await updateDoc(userRef,{
                lastSeen:Date.now()
            })
           setInterval(async() => {
            if(auth.chatUSer){
                await updateDoc(userRef,{
                    lastSeen:Date.now()
                })
            }
           }, 60000);
            
            
            
            
        } catch (error) {
            console.error(error);
        }
    }


    const value = {
        userData ,setUserData,
        chatData,setchatdata,
        loadUserData
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
