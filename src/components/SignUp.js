import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { auth, db } from "../configuration/firebaseConfig";
import "react-toastify/dist/ReactToastify.css";

export default function SingUp() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const handleFormSubmission = async (e) => {
    e.preventDefault();
    if (!credentials.name || !credentials.email || !credentials.password) {
      toast.warn("All fields should be filled");
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        createdAt: Timestamp.fromDate(new Date()),
      });

      setCredentials({ name: "", email: "", password: "" });
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
          <label htmlFor="email">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            aria-describedby="emailHelp"
            placeholder="Enter name"
            onChange={handleInput}
            minLength={4}
            required
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleInput}
            required
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
            minLength={8}
            required
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
