import { useContext } from "react";
import { ToastContext } from "../context/toast/toast";

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      "useEventListenerContext must be used within a EventListenerContextProvider"
    );
  }
  return context;
};
