import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import handler from"./api/hello"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  console.log(handler)
  return (
    <>
    {handler}nflldsjflek
     
    </>
  );
}
