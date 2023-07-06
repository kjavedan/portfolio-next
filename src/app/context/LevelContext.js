import { createContext, useState } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [level, setLevel] = useState(1);

  return <Context.Provider value={{ level }}>{children}</Context.Provider>;
};

export { Context as LevelContext, ContextProvider as LevelContextProvider };
