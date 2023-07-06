"use client";

import Header from "./components/Header";
import { SoundContextProvider } from "./context/SoundContext";
import "./globals.scss";
import { Poppins, ABeeZee } from "next/font/google";

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

export const metadata = {
  title: "Khaled Javedan",
  description: "khaled javedan portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${aBeeZee.variable}`}>
      <body>
        <SoundContextProvider>
          <Header />
          {children}
        </SoundContextProvider>
      </body>
    </html>
  );
}
