/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import "./profileupdate.css";
import assets from "../../assets/assets";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config/FIrebase";
import { Navigate, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Profileupdate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [uid, setUid] = useState("");
  const {setUserData}=useContext(AppContext)
  const profileUpdate = async (event) => {
    event.preventDefault();
    try {
      const docRef = doc(db, "users", uid);

      // Update only name and bio in Firestore
      await updateDoc(docRef, {
        name: name,
        bio: bio,
      });
      const snap=await getDoc(docRef);
      setUserData(snap.data());
      navigate("/chat");
    } catch (error) {
      console.error( error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setName(docSnap.data().name || "");
          setBio(docSnap.data().bio || "");
        }
      } else {
        // Navigate("/");
      }
    });
  }, []);

  return (
    <div className="profile">
      <div className="profile-contianer">
        <form onSubmit={profileUpdate}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
              disabled
            />
            <img src={assets.avatar_icon} alt="" />
            Upload profile image (disabled)
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Your name"
            required
          />
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            placeholder="Write profile bio"
            required
          ></textarea>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default Profileupdate;
