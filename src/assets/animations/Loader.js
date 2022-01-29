import React from "react";
import Logo from "../images/snapnotes.png";
const Loader = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <div className="spinner-border text-primary" role="status"></div> */}
      <img
        src={Logo}
        alt="loading"
        style={{ width: "120px", height: "120px", borderRadius: "50%" }}
      />
      <p className="text-bold">Loading...</p>
    </div>
  );
};

export default Loader;
