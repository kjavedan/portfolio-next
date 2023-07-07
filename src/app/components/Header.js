import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import { CloseSquare, Key, Lock1, More, VolumeMute } from "iconsax-react";
import { SoundContext } from "../context/SoundContext";
import { LevelContext } from "../context/LevelContext";

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
    <div className={styles.header}>
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
          <div>
            <h4>challenge 1</h4>
          </div>
          <div>
            <h4>About</h4>
            {level >= 1 ? <Key /> : <Lock1 />}
          </div>
          <div>
            <h4>challenge 2</h4>
          </div>
          <div>
            <h4>Projects</h4>
            {level >= 2 ? <Key /> : <Lock1 />}
          </div>
          <div>
            <h4>challenge 3</h4>
          </div>
          <div>
            <h4>Contact me</h4>
            {level >= 3 ? <Key /> : <Lock1 />}
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
