"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import clickSound from "../assets/sounds/click.wav";
import useSound from "use-sound";

export default function Home() {
  //SOUNDS
  const [playClickSound] = useSound(clickSound);

  return (
    <main className={styles.main}>
      <div>
        <h1>مَرْحَبًا Welcome</h1>
        <p>My name is <b>Khaled</b>, I am a software engineer who is specializes in web development.</p>
        <Link href={"/challenge1"}>
          <button onClick={() => playClickSound()}>Let's go</button>
        </Link>
      </div>
    </main>
  );
}
