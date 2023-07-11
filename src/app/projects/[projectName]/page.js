import React from "react";
import styles from "./styles.module.scss";
import backgroundImage from "../../../assets/images/backgroundImage.png";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "iconsax-react";

export default function Page(props) {
  console.log(props);

  return (
    <div>
      <div className={styles.cover}>
        <Image src={backgroundImage} alt="cover" loading="lazy" />
        <div className={styles.fader}>
          <h2>blindbox</h2>
          <div>
            <Link href={"/projects"}>
              <h4>
                <ArrowLeft /> projects
              </h4>
            </Link>
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.association}>
            <h3>
              Associated <span className={styles.small__text}>with </span>
              <span className={styles.orange__text}>CEIT</span>
            </h3>
          </div>
          <div className={styles.content}>
            <h3>Brief</h3>
            <p>
              I’t simply an app where you can draw to get certain item in a box,
              I’t simply an app where you can draw to get certain item in a box.
              I’t simply an app where you can draw to get certain item in a box
              I’t simply an app where you can draw to get certain item in a box
              I’t simply an app where you can draw to get certain item in a box
            </p>
            <Image src={backgroundImage} alt="bag" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
}
