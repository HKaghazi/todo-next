"use client";
import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";
import { Toaster } from "sonner";

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <Toaster closeButton />
      {children}
    </SessionProvider>
  );
};
