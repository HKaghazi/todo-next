"use client";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode[];
};

export const AvatarGroup: React.FC<Props> = ({ children }) => {
  return <div className="inline-flex">{children}</div>;
};
