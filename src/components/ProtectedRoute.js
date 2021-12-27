import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";

import { AuthContext } from "../contexts/Auth";

export default function ProtectedRoute() {
  const { userAuthenticated } = useContext(AuthContext);

  //if user is not authenticated will redirect to login page
  return userAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
