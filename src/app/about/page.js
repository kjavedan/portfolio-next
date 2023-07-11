import React, { useContext } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import useSound from "use-sound";
import clickSound from "../../assets/sounds/click.wav";
import Experience from "../components/Experience";
import { Canvas, useThree } from "@react-three/fiber";
import { SoundContext } from "@/context/SoundContext";
import { LevelContext } from "@/context/LevelContext";

export const CustomCamera = () => {
  const { camera } = useThree();
  camera.position.set(0, 0.2, 1.75); // Set the desired camera position
  camera.lookAt(0, 0, 0); // Point the camera towards the origin (0, 0, 0)
  return null;
};

export default function Page() {
  // CONTEXT
  const { sound } = useContext(SoundContext);
  const { level } = useContext(LevelContext);

  // SOUND
  const [playClickSound] = useSound(clickSound);

  // FUNCS
  const handleClick = (link) => {
    sound && playClickSound();
  };

  return (
    <div className={styles.main}>
      <div className={styles.avatar}>
        <Canvas>
          <CustomCamera />
          <Experience page={"about"} />
        </Canvas>
      </div>
      <div className={styles.content}>
        <div>
          <h2>Well I&apos;m Khaled.</h2>
          <p>nice to meet you. 😊</p>
        </div>
        <div className={styles.text__section}>
          <h3>me </h3>
          <p>
            <b>25 years old.</b> Studied Software Engineer, And then became a
            Front-end Developer as you can see. good one though.😎
          </p>
          <p>
            Currently I&apos;m living in <b>United Arab Emirates.</b>
          </p>
        </div>

        <div className={styles.text__section}>
          <h3> work </h3>
          <p>
            I think it&apos;s enough talking about myself let me show you the
            projects I have done.
          </p>
        </div>

        <div className={styles.next__btn}>
          <Link href={level >= 1 ? "/challenge2" : ""}>
            <button onClick={handleClick}>Ok let&apos;s see</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
