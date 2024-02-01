import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import { CloseSquare, More, VolumeMute } from "iconsax-react";
import { SoundContext } from "../../context/SoundContext";
import { LevelContext } from "../../context/LevelContext";
import Link from "next/link";
import swipeSound from "../../assets/sounds/swipe.wav";
import muteSound from "../../assets/sounds/mute.wav";
import unmuteSound from "../../assets/sounds/unmute.wav";
import useSound from "use-sound";
import Image from "next/image";
import logo from '../../assets/images/KJ.png'

export default function Header() {
  //CONTEXT
  const { sound, toggleSound } = useContext(SoundContext);
  const { level } = useContext(LevelContext);

  //SOUNDS
  const [playSwipeSound] = useSound(swipeSound);
  const [playMuteSound] = useSound(muteSound);
  const [playUnmuteSound] = useSound(unmuteSound);

  //STATE
  const [isMenu, setIsMenu] = useState(false);
  const [isActive, setIsActive] = useState(false);

  //FUNCS
  const handleClick = () => {
    toggleSound();
    setIsActive(true);
    sound ? playMuteSound() : playUnmuteSound();
    setTimeout(() => {
      setIsActive(false);
    }, 1000);
  };

  const handleMenuBtnClick = () => {
    setIsMenu(true);
    sound && playSwipeSound();
  };

  const handleCloseMenuBtn = () => {
    setIsMenu(false);
    sound && playSwipeSound();
  };

  return (
    <div className={styles.nav}>
      <Link href={'/'}>
        <Image width={30} height={30} loading="lazy" src={logo} alt='logo' />
      </Link>
      <div className={styles.nav__logo}>
        <div onClick={handleClick} className={isActive ? styles.active : ""}>
          {sound ? <VolumeMute /> : <VolumeMute variant="Broken" />}
        </div>
        <div onClick={handleMenuBtnClick} className={styles.menu__Btn}>
          <More />
        </div>
      </div>
      <div className={`${styles.menu} ${isMenu ? styles.isMenu : ""}`}>
        <div className={styles.menu__close} onClick={handleCloseMenuBtn}>
          <CloseSquare />
        </div>

        <div>
          <Link href={"/"} style={{ textDecoration: "none" }}>
            <div>
              <h4 className={styles.logo}>KJ .</h4>
            </div>
          </Link>
          <Link href={"/challenge1"} className={styles.link}>
            <div>
              <h4>challenge 1</h4>
            </div>
          </Link>
          <div>
            <Link href={"/about"} className={styles.link}>
              {"🔓"}
              <h4>About</h4>
            </Link>
          </div>
          <div>
            <Link href={"/challenge2"} className={styles.link}>
              {"🔓"}
              <h4>challenge 2</h4>
            </Link>
          </div>
          <div>
            <Link href={"/projects"} className={styles.link}>
              {"🔓"}
              <h4>Projects</h4>
            </Link>
          </div>
          <div>
            <Link href={"/challenge3"} className={styles.link}>
              {"🔓"}
              <h4>challenge 3</h4>
            </Link>
          </div>
          <div>
            <Link href={"/contact"} className={styles.link}>
              {"🔓"}
              <h4>Contact me</h4>
            </Link>
          </div>
        </div>
      </div>
      {isMenu && (
        <div
          className={styles.menu__close__div}
          onClick={handleCloseMenuBtn}
        ></div>
      )}
    </div>
  );
}
