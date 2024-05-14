import React, { useEffect, useState } from "react";
interface childrenType {
  children: React.ReactNode;
}
export interface ToastContextType {
  toggleToast: (message: string, type: "success" | "error") => void;
}
import styles from "./toast.module.css";
import Svg from "../../components/Svg";
import { error, success } from "../../utils/Svgs";
export const ToastContext = React.createContext<ToastContextType>(null!);
export default function ToastProvider({ children }: childrenType) {
  const [showtoast, setShowtoast] = useState({
    show: false,
    message: "",
    type: "error" as "success" | "error" | "",
  });
  useEffect(() => {
    if (!showtoast.show) return;
    const timer = setTimeout(() => {
      setShowtoast({ show: false, message: "", type: "" });
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [showtoast]);
  const toggleToast = (message: string, type: "success" | "error") => {
    setShowtoast({ show: true, message, type });
  };
  return (
    <ToastContext.Provider
      value={{
        toggleToast,
      }}
    >
      {" "}
      {children}{" "}
      {showtoast.show && (
        <div
          className={
            styles.toast +
            " " +
            (showtoast.type === "error"
              ? `${styles.toast__error}`
              : `${styles.toast__success}`)
          }
        >
          <div className={styles.toast__content}>
            <div
              className={
                styles.toast__content__icon +
                " " +
                (showtoast.type === "error"
                  ? `${styles.toast__content__icon__error}`
                  : `${styles.toast__content__icon__success}
              `)
              }
            >
              {/* <svg
                width="25"
                height="25"
                viewBox="0 0 23 19"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.52002 19L11.52 0L22.52 19H0.52002ZM11.52 16C11.8034 16 12.041 15.904 12.233 15.712C12.425 15.52 12.5207 15.2827 12.52 15C12.5194 14.7173 12.4234 14.48 12.232 14.288C12.0407 14.096 11.8034 14 11.52 14C11.2367 14 10.9994 14.096 10.808 14.288C10.6167 14.48 10.5207 14.7173 10.52 15C10.5194 15.2827 10.6154 15.5203 10.808 15.713C11.0007 15.9057 11.238 16.0013 11.52 16ZM10.52 13H12.52V8H10.52V13Z"
                  fill="currentColor"
                />
              </svg> */}
              <Svg
                path={showtoast.type === "error" ? error.path : success.path}
                view={
                  showtoast.type === "error" ? error.viewBox : success.viewBox
                }
                classlist="w-12 h-12 fill-current"
                props={{
                  clipRule: "evenodd",
                  fillRule: "evenodd",
                }}
              />
            </div>
            <div className={styles.toast__content__message}>
              <div
                className={
                  styles.toast__content__message__title +
                  " " +
                  (showtoast.type === "error"
                    ? `${styles.toast__content__message__title__error}`
                    : `${styles.toast__content__message__title__success}
                  
                  `)
                }
              >
                {showtoast.type.charAt(0).toUpperCase() +
                  showtoast.type.slice(1)}
              </div>
              <div className={styles.toast__content__message__body}>
                {showtoast.message}
              </div>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
