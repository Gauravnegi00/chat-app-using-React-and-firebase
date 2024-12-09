/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "./chatbox.css";
import assets from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/FIrebase";
import { toast } from "react-toastify";
import upload from "../../lib/Upload";

const Chatbox = () => {
  const { userData, messagesId, chatUser, messages, setMessages } =
    useContext(AppContext);

  const [input, setInput] = useState("");

  const sendMessage = async () => {
    try {
      if (input && messagesId) {
        // Add the new message to the Firestore messages collection
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: Timestamp.now(),
          }),
        });

        const userIDs = [chatUser.rId, userData.id];

        // Update each user's chats document
        for (const id of userIDs) {
          const userChatsRef = doc(db, "chats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatsData.findIndex(
              (c) => c.messageId === messagesId
            );

            // Update chat data if the chat exists
            if (chatIndex !== -1) {
              userChatData.chatsData[chatIndex].lastMessage = input.slice(
                0,
                30
              );
              userChatData.chatsData[chatIndex].updatedAt = Date.now();

              if (userChatData.chatsData[chatIndex].rId === userData.id) {
                userChatData.chatsData[chatIndex].messageSeen = false;
              }

              await updateDoc(userChatsRef, {
                chatsData: userChatData.chatsData,
              });
            }
          }
        }

        setInput("");
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error sending message:", error);
    }
  };


  const sendImage = async (e) => {
    try {
      // Upload the image and get the file URL
      const fileUrl = await upload(e.target.files[0]);
      if (fileUrl && messagesId) {
        // Add the image message to Firestore messages collection
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            image: fileUrl,
            createdAt: Timestamp.now(),
          }),
        });
  
        const userIDs = [chatUser.rId, userData.id];
  
        // Update each user's chats document
        for (const id of userIDs) {
          const userChatsRef = doc(db, "chats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);
  
          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatsData.findIndex(
              (c) => c.messageId === messagesId
            );
  
            // Update chat data if the chat exists
            if (chatIndex !== -1) {
              userChatData.chatsData[chatIndex].lastMessage = "image";
              userChatData.chatsData[chatIndex].updatedAt = Date.now();
  
              if (userChatData.chatsData[chatIndex].rId === userData.id) {
                userChatData.chatsData[chatIndex].messageSeen = false;
              }
  
              await updateDoc(userChatsRef, {
                chatsData: userChatData.chatsData,
              });
            }
          }
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error sending image:", error);
    }
  };
  

  const convertTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    return `${formattedHours}:${minutes} ${period}`;
  };

  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
        setMessages(res.data().messages.reverse());
      });
      return () => {
        unSub();
      };
    }
  }, [messagesId]);

  return chatUser ? (
    <div className="chat-box">
      <div className="chat-user">
        <img src={assets.profile_img} alt="profile" />
        <p>
          {chatUser.userData.name}{" "}
          <img src={assets.green_dot} className="dot" alt="online status" />
        </p>
        <img src={assets.help_icon} alt="help" className="help" />
      </div>
      <div className="chat-msg">
        
  {messages.map((msg, index) => (
    <div
      key={index}
      className={msg.sId === userData.id ? "s-msg" : "r-msg"}
    >
      {msg.text && <p className="msg">{msg.text}</p>}  {/* Display text message */}
      {msg.image && <img src={msg.image} alt="sent" className="msg-image" />}  {/* Display image message */}

      <div className="msg-meta">
        <img src={assets.profile_img} alt="profile" />
        <p>{convertTime(msg.createdAt)}</p>
      </div>
    </div>
  ))}
</div>
      <div className="chat-input">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Send a message"
        />
        <input onChange={sendImage} type="file" id="image" accept="image/png, image/jpg" hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="gallery" />
        </label>
        <img onClick={sendMessage} src={assets.send_button} alt="send" />
      </div>
    </div>
  ) : (
    <div className="chat-welcome">
      <img src={assets.logo_icon} alt="welcome" />
    </div>
  );
};

export default Chatbox;
