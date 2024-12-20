/* eslint-disable react/prop-types */

import useAuth from "../hooks/useAuth";
import Loading from "../pages/Loading";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return <Loading />;
  }
  if (user) {
    return children;
  }

  return <Navigate to="/" state={{ form: location }} replace />;
};

export default PrivateRoute;
