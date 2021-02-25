import { createContext, ReactNode } from "react";

export interface CountdownContextData {}

export type CountdownProviderProps = {
  children: ReactNode;
};

const CountdownContext = createContext({} as CountdownContextData);

export const CountdownProvider: React.FC<CountdownProviderProps> = ({
  children,
}) => {
  return (
    <CountdownContext.Provider value={{}}>{children}</CountdownContext.Provider>
  );
};
