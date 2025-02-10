import React, { useContext } from "react";
import { AuthContextGoogle } from "../Auth/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

function Private({ children }) {
  const { user, loading } = useContext(AuthContextGoogle);
  const location = useLocation();
  //(loading);

  if (loading) {
    return (
      <div className="flex justify-center  items-center ">
        <span className="loading size-36  loading-spinner text-error"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={location?.pathname}></Navigate>;
}

export default Private;
