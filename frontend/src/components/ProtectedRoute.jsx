import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {

  const role = localStorage.getItem("role");

  if (role!== "patient") {
    return <Navigate to="/login" replace />;
  }

  return children;
};
