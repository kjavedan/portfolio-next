import { createContext, useState } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [sound, setSound] = useState(true);

  const toggleSound = () => {
    setSound(!sound);
  };

  return (
    <Context.Provider value={{ sound, toggleSound }}>
      {children}
    </Context.Provider>
  );
};

export { Context as SoundContext, ContextProvider as SoundContextProvider };
