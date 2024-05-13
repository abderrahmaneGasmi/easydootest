import React from "react";
import AuthProvider from "./authProvider";

interface childrenType {
  children: React.ReactNode;
}
export default function ContextProviders({ children }: childrenType) {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
