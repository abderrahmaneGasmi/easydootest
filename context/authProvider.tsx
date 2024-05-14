import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { loginApi } from "../api/auth";
import { useToast } from "../hooks/useToast";
import { ToastContextType } from "./toast/toast";
interface childrenType {
  children: React.ReactNode;
}
export interface AuthContextType {
  login: (userData: userData) => Promise<void>;
  logout: () => void;
  checkAuth: () => boolean;
  userInfo: userData | null;
}
type userData = {
  username: string;
  password: string;
};
export const AuthContext = React.createContext<AuthContextType>(null!);
export default function AuthProvider({ children }: childrenType) {
  const { toggleToast }: ToastContextType = useToast();

  const [user, setUser] = useState(null as userData | null);
  const router = useRouter();
  const cookies = new Cookies();
  const login = async (userData: userData) => {
    try {
      const res = await loginApi(userData); // Await the loginApi call
      try {
        let t = JSON.parse(res);
        if (t.token) {
          setUser(userData);
          cookies.set("user", userData, { path: "/" });
          router.push("/");
        } else {
          toggleToast(res, "error");
        }
      } catch (error: any) {
        toggleToast(res, "error");
      }
    } catch (error: any) {
      toggleToast(error.message, "error");
    }
  };

  const logout = () => {
    setUser(null);
    cookies.remove("user");
    router.push("/auth");
  };
  const checkAuth = () => {
    const user = cookies.get("user");

    if (user) {
      setUser(user);
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
        userInfo: user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
