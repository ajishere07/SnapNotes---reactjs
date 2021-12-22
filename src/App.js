import { Routes, Route } from "react-router-dom";
import About from "./compontents/About";
import Home from "./compontents/Home";
import Navbar from "./compontents/Navbar";
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
          </Routes>
        </div>
      </NotesStates>
    </>
  );
}

export default App;
