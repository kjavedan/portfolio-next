import { createContext, useState } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [level, setLevel] = useState(4);

  const unlockLevel = (levelToUnlock) => {
    if (levelToUnlock > level) {
      setLevel(levelToUnlock);
    }
  };

  return (
    <Context.Provider value={{ level, unlockLevel }}>
      {children}
    </Context.Provider>
  );
};

export { Context as LevelContext, ContextProvider as LevelContextProvider };
