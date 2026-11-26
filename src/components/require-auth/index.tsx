import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";

export function RequireAuth() {
  const { authenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  if(loading){
    return <>Carregando</>
  }

  return authenticated ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}