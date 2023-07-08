import React from "react";
import styles from "./styles.module.scss";
import Link from "next/link";

export default function page() {
  return (
    <div className={styles.main}>
      <div>
        <h2>Well I’m Khaled.</h2>

        <p>nice to meet you. 😊</p>
      </div>
      <div className={styles.text__section}>
        <h3>Boring </h3>
        <p>
          I Studied Software Engineer, And then became a Front-end Developer as
          you can see. good one though.😎
        </p>
        <p>Currently I’m living in United Arab Emirates.</p>
      </div>

      <div className={styles.text__section}>
        <h3> Exciting </h3>
        <p>
          I think it’s enough talking about myself let me show you the projects
          I have done.
        </p>
      </div>

      <div className={styles.next__btn}>
        <Link href={"/challenge2"}>
          <button>Ok let's see</button>
        </Link>
      </div>
    </div>
  );
}
