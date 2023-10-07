import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      {children}
    </div>
  );
}
