import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import { CloseSquare, More, VolumeMute } from "iconsax-react";
import { SoundContext } from "../../context/SoundContext";
import { LevelContext } from "../../context/LevelContext";
import Link from "next/link";

export default function Header() {
  //CONTEXT
  const { sound, toggleSound } = useContext(SoundContext);
  const { level } = useContext(LevelContext);

  //STATE
  const [isMenu, setIsMenu] = useState(false);
  const [isActive, setIsActive] = useState(false);

  //FUNCS
  const handleClick = () => {
    toggleSound();
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 1000);
  };

  return (
    <div className={styles.nav}>
      <div onClick={handleClick} className={isActive ? styles.active : ""}>
        {sound ? <VolumeMute /> : <VolumeMute variant="Broken" />}
      </div>
      <div onClick={() => setIsMenu(true)} className={styles.menu__Btn}>
        <More />
      </div>
      <div className={`${styles.menu} ${isMenu ? styles.isMenu : ""}`}>
        <div className={styles.menu__close} onClick={() => setIsMenu(false)}>
          <CloseSquare />
        </div>

        <div>
          <Link href={"/challenge1"} className={styles.link}>
            <div>
              <h4>challenge 1</h4>
            </div>
          </Link>
          <div>
            <Link href={level >= 1 ? "/about" : ""} className={styles.link}>
              {level >= 1 ? "🔓" : "🔒"}
              <h4>About</h4>
            </Link>
          </div>
          <div>
            <Link
              href={level >= 1 ? "/challenge2" : ""}
              className={styles.link}
            >
              {level >= 1 ? "🔓" : "🔒"}
              <h4>challenge 2</h4>
            </Link>
          </div>
          <div>
            <Link href={level >= 2 ? "/projects" : ""} className={styles.link}>
              {level >= 2 ? "🔓" : "🔒"}
              <h4>Projects</h4>
            </Link>
          </div>
          <div>
            <Link
              href={level >= 2 ? "/challenge3" : ""}
              className={styles.link}
            >
              {level >= 2 ? "🔓" : "🔒"}
              <h4>challenge 3</h4>
            </Link>
          </div>
          <div>
            <Link href={level >= 3 ? "/contact" : ""} className={styles.link}>
              {level >= 3 ? "🔓" : "🔒"}
              <h4>Contact me</h4>
            </Link>
          </div>
        </div>
      </div>
      {isMenu && (
        <div
          className={styles.menu__close__div}
          onClick={() => setIsMenu(false)}
        ></div>
      )}
    </div>
  );
}
