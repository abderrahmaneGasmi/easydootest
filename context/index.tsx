import React from "react";
import AuthProvider from "./authProvider";
import ToastProvider from "./toast/toast";

interface childrenType {
  children: React.ReactNode;
}
export default function ContextProviders({ children }: childrenType) {
  return (
    <>
      <ToastProvider>
        {" "}
        <AuthProvider>{children}</AuthProvider>
      </ToastProvider>
    </>
  );
}
