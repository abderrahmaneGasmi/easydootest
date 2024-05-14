import { useContext } from "react";
import { AuthContext } from "../context/authProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useEventListenerContext must be used within a EventListenerContextProvider"
    );
  }
  return context;
};
