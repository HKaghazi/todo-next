"use client";
import { AVATAR_PLACEHOLDER_URL } from "@lib/constants";
import { cn } from "@lib/utils";
import Image, { ImageProps } from "next/image";
import React from "react";

type Props = Omit<ImageProps, "src" | "alt"> & {
  alt?: string | null;
  src?: string | null;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: 32,
  md: 40,
  lg: 48,
};

export const Avatar: React.FC<Props> = (props) => {
  const { size = "md", className, src, alt, style, ...rest } = props;

  // const sizeCls = styles[size];
  const nSize = sizes[size];

  return (
    <Image
      priority
      src={src && src.length > 0 ? src : AVATAR_PLACEHOLDER_URL}
      alt={alt ?? "avatar"}
      width={nSize}
      height={nSize}
      className={cn("rounded-full", className)}
      style={{ ...style, width: nSize, height: nSize }}
      {...rest}
    />
  );
};
