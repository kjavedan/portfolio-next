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
        <h1>Welcome to my world</h1>
        <p>I’m ? You can get to know me by passing the challenges.</p>
        <Link href={"/challenge1"}>
          <button onClick={() => playClickSound()}>start</button>
        </Link>
      </div>
    </main>
  );
}
