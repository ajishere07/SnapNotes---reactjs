import React from "react";

export default function Loading() {
  return (
    <div style={{ position: "relative" }}>
      <h1
        style={{
          color: "grey",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Loading...
      </h1>
    </div>
  );
}
