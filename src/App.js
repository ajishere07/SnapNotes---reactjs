import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import NotesStates from "./contexts/notes/NotesStates";

import AuthProvider from "./contexts/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <>
      <AuthProvider>
        <NotesStates>
          <Navbar />

          <div className="container">
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route exact path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </NotesStates>
      </AuthProvider>
    </>
  );
}

export default App;
