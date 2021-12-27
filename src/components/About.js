import { onSnapshot, query, where } from "@firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth";
import { collection } from "firebase/firestore";
import { db, upload } from "../configuration/firebaseConfig";

function About() {
  const { userAuthenticated } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [profileImg, setProfileImg] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (userAuthenticated) {
      const usersCollectionRef = collection(db, "users");
      const queryObject = query(
        usersCollectionRef,
        where("uid", "==", `${userAuthenticated.uid}`)
      );
      onSnapshot(queryObject, (snapshot) => {
        let Info = { name: "", email: "" };
        snapshot.docs.forEach((doc) => {
          Info.name = doc.data().name;
          Info.email = doc.data().email;
        });
        setUserInfo(Info);
      });

      if (profileImg === null) {
        setProfileImg("http://cdn.onlinewebfonts.com/svg/img_258083.png");
      } else {
        setProfileImg(userAuthenticated.photoURL);
      }
    }
  }, [profileImg]);
  console.log(userAuthenticated);
  console.log(profileImg);
  return (
    <div className="container my-4">
      <div className="d-flex my-2" style={{ width: "30%" }}>
        <div style={{ position: "relative" }}>
          <img
            src={profileImg}
            className="img-thumbnail"
            alt=""
            style={{
              cursor: "pointer",
              objectFit: "contain",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              verticalAlign: "middle",
            }}
          />
          <label
            style={{
              display: "block",
              fontSize: "10px",
              position: "absolute",
              bottom: "10px",
              left: "10px",
            }}
            htmlFor="imageUploader"
            className="uploadLabel"
          >
            <i className="fas fa-camera fa-2x uploadIcon"></i>
          </label>
          <input
            style={{ display: "none" }}
            name="imageUploader"
            id="imageUploader"
            type="file"
            onChange={(e) => {
              if (e.target.files[0]) setPhoto(e.target.files[0]);
            }}
          />
        </div>
        <div className="mx-4">
          <h1>{userInfo.name}</h1>
          <h5>{userInfo.email}</h5>
        </div>
      </div>
      <button
        style={{
          borderRadius: "20px",
          backgroundColor: "black",
          color: "white",
          width: "30%",
        }}
        disabled={loading || !photo}
        onClick={() => upload(photo, userAuthenticated, setLoading)}
      >
        Upload Image
      </button>
    </div>
  );
}

export default About;
