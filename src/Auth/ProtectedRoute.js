import { useData } from "./DataContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isProtected = true}) => {
  const { isAuthenticated, isAdmin } = useData();
  if (!isAuthenticated && isProtected) {
    return <Navigate to="/login" replace />;
  }

  //route from login to dashboard(login page is not a protected page and user is authenticated when login click)
  if (!isProtected && isAuthenticated && !isAdmin) {
    console.log("dashboard");
    return <Navigate to="/dashboard" replace />;
  }
  if (!isProtected && isAuthenticated && isAdmin) {
    console.log("not dashb");
    return <Navigate to="/admin-dashboard/item-management" replace />;
  }
  return children;
};

export default ProtectedRoute;
