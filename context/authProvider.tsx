import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import Cookies from "universal-cookie";
interface childrenType {
  children: React.ReactNode;
}
export interface AuthContextType {
  login: (userData: userData) => void;
  logout: () => void;
  checkAuth: () => boolean;
}
type userData = {
  username: string;
  password: string;
};
export const AuthContext = React.createContext<AuthContextType>(null!);
export default function AuthProvider({ children }: childrenType) {
  const [user, setUser] = useState(null as userData | null);
  const router = useRouter();
  const cookies = new Cookies();
  const login = (userData: userData) => {
    setUser(userData);
    cookies.set("user", userData, { path: "/" });
    router.push("/");
  };

  const logout = () => {
    setUser(null);
    cookies.remove("user");
    router.push("/auth");
  };
  const checkAuth = () => {
    const user = cookies.get("user");
    if (user) {
      return true;
    }
    return false;
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
