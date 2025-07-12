import { Navigate } from "react-router-dom";

function PrivateRoute({ isAuthenticated,isUserId, children }) {
  return isAuthenticated &&isUserId? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
