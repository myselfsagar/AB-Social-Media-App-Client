import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { KEY_ACCESS_TOKEN, getItem } from "../utils/localStorageManager";

function NotLoggedIn() {
  const user = getItem(KEY_ACCESS_TOKEN);
  return user ? <Navigate to="/" /> : <Outlet />;
}

export default NotLoggedIn;
