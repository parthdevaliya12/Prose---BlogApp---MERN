import { Navigate } from "react-router-dom";
import AuthenticatedLayout from "./AuthenticatedLayout";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
};

export default ProtectedRoute;
