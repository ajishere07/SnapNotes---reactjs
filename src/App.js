import { Routes, Route } from "react-router-dom";
import About from "./compontents/About";
import Home from "./compontents/Home";
import Navbar from "./compontents/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/about" element={<About />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
