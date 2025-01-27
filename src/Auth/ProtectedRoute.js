import { useData } from "./DataContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isProtected=true }) => {
  const { isAuthenticated } = useData();
  if(!isAuthenticated && isProtected){
    return <Navigate to="/login" replace />;
  }

  //route from login to dashboard(login page is not a protected page and user is authenticated when login click)
  if(!isProtected && isAuthenticated){                      
    return <Navigate to="/dashboard" replace />;
  }
  return children;
  
};

export default ProtectedRoute;
