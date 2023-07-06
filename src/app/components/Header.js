import React, { useContext, useState } from "react";
import styles from "./styles.module.scss";
import { VolumeMute } from "iconsax-react";
import { SoundContext } from "../context/SoundContext";

export default function Header() {
  //CONTEXT
  const { sound, toggleSound } = useContext(SoundContext);

  //STATE
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
    </div>
  );
}
