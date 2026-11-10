import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";

export function RequireAuth() {
  const { authenticated } = useContext(AuthContext);
  const location = useLocation();

  return authenticated ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}