import localFont from "next/font/local";
// import { Inter } from "next/font/google";

// export const satoshi = localFont({
//   src: "./Satoshi-Variable.woff2",
//   variable: "--font-satoshi",
//   weight: "300 900",
//   display: "swap",
//   style: "normal",
// });

export const yekan = localFont({
  src: [
    {
      path: "./Yekan-Black.woff",
      weight: "800 900",
      style: "normal",
    },
    {
      path: "./Yekan-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Yekan-Medium.woff",
      weight: "500 600",
      style: "normal",
    },
    {
      path: "./Yekan-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Yekan-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Yekan-Thin.woff",
      weight: "100 200",
      style: "normal",
    },
  ],
  display: "swap",
  style: "normal",
});

// export const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
// });
