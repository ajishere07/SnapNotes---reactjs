import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import NotesStates from "./contexts/notes/NotesStates";

import AuthProvider from "./contexts/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { Todo } from "./components/Todo";
import { TodoStates } from "./contexts/notes/TodoStates";
function App() {
  return (
    <>
      <TodoStates>
        <AuthProvider>
          <NotesStates>
            <Navbar />

            <div className="container">
              <Routes>
                <Route element={<ProtectedRoute />}>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/todos" element={<Todo />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </div>
          </NotesStates>
        </AuthProvider>
      </TodoStates>
    </>
  );
}

export default App;
