"use client";

import React, { useContext } from "react";
import styles from "./styles.module.scss";
import clickSound from "../../assets/sounds/click.wav";
import useSound from "use-sound";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "iconsax-react";
import { SoundContext } from "@/context/SoundContext";
import { LevelContext } from "@/context/LevelContext";
import { useRouter } from "next/navigation";
import projectsData, { projectsInfo } from "@/data/projectsData";

export const generateStaticParams = () => {
  return projectsInfo.map((project) => {
    return {
      projectName: project.name,
    };
  });
};

export default function Page() {
  //NAVIGATINO
  const router = useRouter();

  //CONTEXT
  const { sound } = useContext(SoundContext);
  const { level } = useContext(LevelContext);

  //SOUND
  const [playClickSound] = useSound(clickSound);

  //FUNCS
  const handleClick = (link) => {
    sound && playClickSound();
    router.push(`projects/${link}`);
  };
  const handleClickBtn = () => {
    sound && playClickSound();
  };

  //JSX
  const projectsElements = projectsData.map((project, index) => (
    <div
      key={index}
      onClick={() => handleClick(project.name)}
      className={styles.project}
    >
      <div className={styles.image}>
        <Image loading="lazy" src={project.img} alt={project.name} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <h4>{project.name}</h4>
          <div className={styles.more}>
            <ArrowRight />
          </div>
        </div>
        <p>{project.description}</p>
        <h5>Tech stack</h5>
        <p>{project.usedTech}</p>
      </div>
    </div>
  ));

  return (
    <div className={styles.main}>
      <div>
        <h2>projects 🧑‍💻</h2>
      </div>
      <div className={styles.projects__container}>{projectsElements}</div>
      <div className={styles.next__btn}>
        <Link href={"/challenge3"}>
          <button onClick={handleClickBtn}>contact</button>
        </Link>
      </div>
    </div>
  );
}
