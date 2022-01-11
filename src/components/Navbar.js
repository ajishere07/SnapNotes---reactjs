import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "@firebase/auth";
import { auth } from "../configuration/firebaseConfig";
import { AuthContext } from "../contexts/Auth";

function Navbar() {
  let location = useLocation();
  const { userAuthenticated } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/todos"
              >
                To-dos
              </Link>
            </li>
          </ul>
          {userAuthenticated ? (
            <form className="d-flex">
              <button
                className="btn btn-primary mx-2"
                onClick={async () => {
                  await signOut(auth);
                }}
              >
                Logout
              </button>
            </form>
          ) : (
            <form className="d-flex">
              <Link to="/login" className="btn btn-primary mx-2" role="button">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary mx-2" role="button">
                Sign up
              </Link>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;