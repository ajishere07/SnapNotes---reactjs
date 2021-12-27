import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../configuration/firebaseConfig";
import Loading from "../components/Loading.js";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userAuthenticated, setUserAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserAuthenticated(user);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;
  return (
    <AuthContext.Provider value={{ userAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
