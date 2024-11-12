"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type TAuthContext = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

export const AuthContext = createContext<TAuthContext>({
  email: "",
  setEmail: () => {},
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string>("");
  return (
    <AuthContext.Provider value={{ email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
