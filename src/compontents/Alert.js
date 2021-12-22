import React from "react";

function Alert({ msg }) {
  return (
    <div className="alert alert-primary" role="alert">
      {msg}
    </div>
  );
}

export default Alert;
