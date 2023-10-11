"use client";
import { APP_NAME } from "@lib/constants";
import Image, { ImageProps } from "next/image";
import logo_img from "public/logo.svg";
import React from "react";

type Props = Omit<ImageProps, "src" | "alt"> & {
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: 32,
  md: 40,
  lg: 48,
};

export const Logo: React.FC<Props> = (props) => {
  const { size = "md", style, ...rest } = props;

  // const sizeCls = styles[size];
  const nSize = sizes[size];

  return (
    <Image
      src={logo_img}
      alt={`${APP_NAME} logo`}
      width={nSize}
      height={nSize}
      style={{ ...style, width: "auto", height: nSize }}
      {...rest}
    />
  );
};
