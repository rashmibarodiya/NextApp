import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
// import {a} from"./api/hello"
// import {b} from"./api/hello"

import Appbar2 from "./Appbar2";
import Signup from "./signup/page";
import { RecoilRoot } from "recoil";
import useState from 'react'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return(
    <>
    {/* <Signup></Signup> */}

</>
  )

// console.log(a)
// console.log("fkjdhfkjd+ " +b)
//fetch(`/a`)
  // return (
  //   <>
    
  //   dhgksdhgkhskflsgd
  //   {/* <RecoilRoot>
  //     <handler></handler>
  //   <Appbar2></Appbar2>
  //   </RecoilRoot> */}
    
     
  //   </>
  // );
}
