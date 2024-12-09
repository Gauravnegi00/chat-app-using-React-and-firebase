/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import "./leftsidebar.css";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/FIrebase";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const Leftsidebar = () => {
  const navigate = useNavigate();
  const { userData, chatData, chatUser, setChatUser, setMessagesId, messagesId } = useContext(AppContext);

  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  // Handle search input
  const inputHandler = async (e) => {
    try {
      const input = e.target.value.trim();
      if (input) {
        setShowSearch(true);
        const userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", input.toLowerCase()));
        const querySnap = await getDocs(q);

        if (!querySnap.empty) {
          const selectedUser = querySnap.docs[0].data();

          if (selectedUser.id !== userData.id) {
            const userExists = chatData.some((chat) => chat.rId === selectedUser.id);
            if (!userExists) {
              setUser(selectedUser);
            } else {
              setUser(null); 
              toast.info("Chat already exists with this user.");
            }
          } else {
            setUser(null); 
          }
        } else {
          setUser(null);
        }
      } else {
        setShowSearch(false);
      }
    } catch (error) {
      console.error("Error searching for user:", error.message);
    }
  };

  // Add a new chat
  const addChat = async () => {
    try {
      const messagesRef = collection(db, "messages");
      const chatsRef = collection(db, "chats");

      const userChatDoc = doc(chatsRef, userData.id);
      const userChatSnap = await getDoc(userChatDoc);
      const chatExists =
        userChatSnap.exists() &&
        userChatSnap.data().chatsData.some((chat) => chat.rId === user.id);

      if (chatExists) {
        toast.info("Chat already exists with this user.");
        return;
      }

      const newMessageRef = doc(messagesRef);
      await setDoc(newMessageRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      const recipientChatRef = doc(chatsRef, user.id);
      await setDoc(
        recipientChatRef,
        {
          chatsData: arrayUnion({
            messageId: newMessageRef.id,
            lastMessage: "",
            rId: userData.id,
            updatedAt: Date.now(),
            messageSeen: true,
          }),
        },
        { merge: true }
      );

      const currentUserChatRef = doc(chatsRef, userData.id);
      await setDoc(
        currentUserChatRef,
        {
          chatsData: arrayUnion({
            messageId: newMessageRef.id,
            lastMessage: "",
            rId: user.id,
            updatedAt: Date.now(),
            messageSeen: true,
          }),
        },
        { merge: true }
      );

      toast.success("Chat added successfully!");
      setUser(null); 
      setShowSearch(false);
    } catch (error) {
      toast.error("Error adding chat.");
      console.error("Error adding chat:", error);
    }
  };

  const setChat = async (item) => {
    setMessagesId(item.messageId);
    setChatUser(item);

    // Mark message as seen in Firestore when the user clicks
    const chatRef = doc(db, "chats", userData.id);
    const chatSnap = await getDoc(chatRef);
    if (chatSnap.exists()) {
      const chatsData = chatSnap.data().chatsData;
      const chatIndex = chatsData.findIndex((chat) => chat.messageId === item.messageId);

      if (chatIndex !== -1 && !chatsData[chatIndex].messageSeen) {
        chatsData[chatIndex].messageSeen = true;
        await updateDoc(chatRef, {
          chatsData: chatsData,
        });
      }
    }
  };

  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="logo" />
          <div className="menu">
            <img src={assets.menu_icon} alt="menu" className="menu-img" />
            <div className="sub-menu">
              <p onClick={() => navigate("/update")}>Edit Profile</p>
              <hr />
              <p>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="search" />
          <input
            onChange={inputHandler}
            type="text"
            placeholder="Search here..."
          />
        </div>
      </div>
      <div className="ls-list">
        {showSearch && user ? (
          <div onClick={addChat} className="friends add-user">
            <img src={user.avatar} alt="user avatar" />
            <p>{user.name}</p>
          </div>
        ) : (
          chatData.map((item, index) => (
            <div
              onClick={() => setChat(item)}
              className={`friends ${item.messageSeen ? "" : "unseen"}`}
              key={index}
            >
              <img src={assets.profile_img} alt="profile" />
              <div>
                <p>{item.userData.name}</p>
                <span className="msg-aaya">{item.lastMessage}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Leftsidebar;
