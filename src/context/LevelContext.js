import { createContext, useContext, useState } from "react";
import winSound from "../assets/sounds/gamewinFX.mp3";
import { SoundContext } from "./SoundContext";
import useSound from "use-sound";

const Context = createContext();

const ContextProvider = ({ children }) => {
  //CONTEXT
  const { sound } = useContext(SoundContext);
  //SOUND
  const [playGameWinSound] = useSound(winSound);

  //STATES
  const [level, setLevel] = useState(4);

  const unlockLevel = (levelToUnlock) => {
    if (levelToUnlock > level) {
      setLevel(levelToUnlock);
      sound && playGameWinSound();
      console.log("running");
    }
  };

  return (
    <Context.Provider value={{ level, unlockLevel }}>
      {children}
    </Context.Provider>
  );
};

export { Context as LevelContext, ContextProvider as LevelContextProvider };
