import { onSnapshot, query, where } from "@firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/Auth";
import { collection } from "firebase/firestore";
import { db, upload } from "../configuration/firebaseConfig";
import { useParams } from "react-router-dom";
function About() {
  const { userAuthenticated } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [profileImg, setProfileImg] = useState(null);
  // this is 'imgLoading' state is for showing
  // loading spinner before image properly loaded
  const [imgLoading, setImgLoading] = useState(true);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();
  console.log(userId);
  const loadingImage = () => {
    if (imgLoading) {
      setImgLoading(false);
      console.log(imgLoading);
    }
  };
  useEffect(() => {
    if (userAuthenticated) {
      const usersCollectionRef = collection(db, "users");
      const queryObject = query(
        usersCollectionRef,
        where("uid", "==", `${userId}`)
      );
      onSnapshot(queryObject, (snapshot) => {
        let Info = { name: "", email: "" };
        snapshot.docs.forEach((doc) => {
          Info.name = doc.data().name;
          Info.email = doc.data().email;
        });
        setUserInfo(Info);
      });

      if (userAuthenticated?.photoURL) {
        setProfileImg(userAuthenticated.photoURL);
      } else {
        setProfileImg(
          "https://www.pikpng.com/pngl/m/80-805523_default-avatar-svg-png-icon-free-download-264157.png"
        );
      }
    }
  }, [userAuthenticated]);

  return (
    <div className="container my-4">
      <div
        className="d-flex my-2 rounded-3 "
        style={{ border: "2px solid black", padding: "20px" }}
      >
        <div
          style={{
            position: "relative",
            width: "100px",
            height: "100px",
            display: imgLoading ? "none" : "block",
          }}
        >
          <img
            src={profileImg}
            className="img-thumbnail "
            alt=""
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              verticalAlign: "middle",
            }}
            onLoad={loadingImage}
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
            <i className="fas fa-camera fa-2x uploadIcon pe-auto " />
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
        {imgLoading && (
          <div className="d-flex flex-row justify-content-center align-items-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        <div className="ms-2 mx-md-4">
          <h1>{userInfo.name}</h1>
          <h5>{userInfo.email}</h5>
        </div>
      </div>
      <button
        style={{
          backgroundColor: "black",
          color: "white",
          width: "100%",
        }}
        className="rounded-3"
        disabled={loading}
        onClick={() => upload(photo, userAuthenticated, setLoading)}
      >
        {loading ? "Saving Changes..." : "Save Change"}
      </button>
    </div>
  );
}

export default About;
