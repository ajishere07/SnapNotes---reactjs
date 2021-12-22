import React from "react";

export default function NoteItem({ title, desc, tag }) {
  return (
    <div className="col-md-3">
      <div className="card my-3">
        {/* <img src="..." classNameName="card-img-top" alt="..." /> */}
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{desc}</p>
        </div>
      </div>
    </div>
  );
}
