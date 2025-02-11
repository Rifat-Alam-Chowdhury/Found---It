import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { AUthfirebase } from "../Auth/AuthApi";

const Private = ({ children }) => {
  const { user, isloading } = useContext(AUthfirebase);
  const location = useLocation();

  if (isloading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default Private;
