
import React from "react";
import { AuthService } from "../../utils/authService.ts";
import Dashboard from "../Dashboard/Dashboard";
import Home from "../Home/Home";

function Login() {
  return (
    <>
      {AuthService.isAuthenticated() ? (
        <Dashboard />
      ) : (
        <Home />
      )
      }
    </>
  );
}

export default Login;