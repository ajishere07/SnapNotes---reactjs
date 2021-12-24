import { Routes, Route } from "react-router-dom";
import About from "./compontents/About";

import Home from "./compontents/Home";
import Login from "./compontents/Login";
import Navbar from "./compontents/Navbar";
import SingUp from "./compontents/SingUp";
import NotesStates from "./contexts/notes/NotesStates";

function App() {
  return (
    <>
      <NotesStates>
        <Navbar />

        <div className="container">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SingUp />} />
          </Routes>
        </div>
      </NotesStates>
    </>
  );
}

export default App;
