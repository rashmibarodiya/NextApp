import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Signup from "./signup/page"
export default function App({ Component, pageProps }: AppProps) {
  return <>
  
  <Component {...pageProps} />;

  <Signup></Signup>

  
  </>
}
