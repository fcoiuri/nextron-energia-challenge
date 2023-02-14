import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
// import { GlobalProvider } from "../contexts/UserContext";
import { DataProvider } from "../contexts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  );
}
