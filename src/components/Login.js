import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../configuration/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleFormSubmission = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      toast.warn("All fields should be filled");
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      setCredentials({
        email: "",
        password: "",
      });
      toast.success("You Logged in Successfully", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleInput = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <form onSubmit={handleFormSubmission}>
        <div className="form-group my-4">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleInput}
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={credentials.password}
            name="password"
            placeholder="Password"
            onChange={handleInput}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <ToastContainer />
    </>
  );
}
