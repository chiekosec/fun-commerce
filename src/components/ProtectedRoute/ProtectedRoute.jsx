import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    let cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for (let i = 0; i < cookieArr.length; i++) {
      let cookiePair = cookieArr[i].split("=");
      if (name == cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }

  const loggedIn = getCookie('loggedIn')

  if (!loggedIn) {
    return <Navigate to="/signin" />;
  }

  return children;
}

export default ProtectedRoute;
