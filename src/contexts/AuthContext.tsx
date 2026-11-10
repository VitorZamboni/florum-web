/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LoginResponse, UserResponse } from "@/commons/user";
import api from "@/lib/axios";
import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  authenticated: boolean;
  user?: UserResponse;
  handleLogin: (authenticationResponse: LoginResponse) => Promise<any>;
  handleLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] =
    useState<UserResponse>();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setAuthenticatedUser(JSON.parse(storedUser));
      setAuthenticated(true);
      api.setToken(storedToken);
      navigate("/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (
    authenticationResponse: LoginResponse
  ) => {
    try {
      localStorage.setItem(
        "token",
        JSON.stringify(authenticationResponse.token)
      );
      localStorage.setItem("user", JSON.stringify(authenticationResponse.user));
      api.setToken(authenticationResponse.token);

      setAuthenticatedUser(authenticationResponse.user);
      setAuthenticated(true);
    } catch {
      setAuthenticatedUser(undefined);
      setAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    api.setToken("");

    setAuthenticated(false);
    setAuthenticatedUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ authenticated, user: authenticatedUser, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };