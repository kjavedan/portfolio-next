import Link from "next/link";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <h1>Welcome to my world</h1>
        <p>I’m ? You can get to know me by passing the challenges.</p>
        <Link href={"/challenge1"}>
          <button>start</button>
        </Link>
      </div>
    </main>
  );
}
