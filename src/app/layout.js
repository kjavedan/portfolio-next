"use client";

import Header from "./components/Header";
import { LevelContextProvider } from "../context/LevelContext";
import { SoundContextProvider } from "../context/SoundContext";
import "./globals.scss";
import { Poppins, ABeeZee, Bangers, Dokdo, Griffy } from "next/font/google";
import styles from "./page.module.scss";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "800"],
  display: "swap",
});
const aBeeZee = ABeeZee({
  subsets: ["latin"],
  variable: "--font-aBeeZee",
  style: "normal",
  weight: "400",
  display: "swap",
});

const bangers = Bangers({
  subsets: ["latin"],
  variable: "--font-bangers",
  weight: "400",
  display: "swap",
});

const dokdo = Dokdo({
  subsets: ["latin"],
  variable: "--font-dokdo",
  style: "normal",
  weight: "400",
  display: "swap",
});

const griffy = Griffy({
  subsets: ["latin"],
  variable: "--font-griffy",
  style: "normal",
  weight: "400",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${aBeeZee.variable} ${bangers.variable} ${dokdo.variable} ${griffy.variable} ${styles.wrapper}`}
    >
      <body>
        <SoundContextProvider>
          <LevelContextProvider>
            <Header />
            {children}
          </LevelContextProvider>
        </SoundContextProvider>
      </body>
    </html>
  );
}
