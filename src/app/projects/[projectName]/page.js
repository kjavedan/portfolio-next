import React from "react";
import styles from "./styles.module.scss";
import backgroundImage from "../../../assets/images/backgroundImage.png";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "iconsax-react";
import { projectsInfo } from "@/data/projectsData";

export default function Page({ params }) {
  const project = projectsInfo.find(
    (project) => project.name === params.projectName
  );

  return (
    <div>
      <div className={styles.cover}>
        <Image src={backgroundImage} alt="cover" loading="lazy" />
        <div className={styles.fader}>
          <h2>{project.name}</h2>
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
              <span className={styles.orange__text}>{project.association}</span>
            </h3>
          </div>
          <div className={styles.content}>
            <h3>Brief</h3>
            <p>{project.description}</p>
            {/* <Image src={backgroundImage} alt="bag" loading="lazy" /> */}
          </div>
          <button className={styles.launch__btn}>
            <a href={project.link}>launch app</a>
          </button>
        </div>
      </div>
    </div>
  );
}
